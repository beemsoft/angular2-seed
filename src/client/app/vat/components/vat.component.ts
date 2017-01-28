import {Component, OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {ImportListService, Transaction, CostCharacter, CostType} from "../../shared/services/import-list.service";
import {CostMatch, CostMatchService} from "../../shared/services/cost-match.service";
import {LabelService} from "../../shared/services/label.service";
import {VatCalculationService, VatReport} from "../../shared/services/vat-calculation.service";
import {TransactionTableComponent} from "./transaction-table.component";

@Component({
  moduleId: module.id,
  selector: 'vat',
  templateUrl: 'vat.component.html',
  styleUrls: ['vat.component.css']
})
export class VatComponent implements OnInit {
  uploadedFile: File;
  importedText: string;
  public vatReport: VatReport;
  private costMatches;
  transactionsLoaded: number = 0;
  transactionsUnmatched: number;
  private transactions:Array<Transaction> = [];
  public costMatch: CostMatch;
  private filterString: string;

  constructor(
    private importListService: ImportListService,
    public costMatchService: CostMatchService,
    private labelService: LabelService,
    public transactionTable: TransactionTableComponent
  ) {
    this.uploadedFile = null;
    this.costMatch = new CostMatch();
  }

  ngOnInit() {
    this.costMatches = this.costMatchService.getMatches()
      .subscribe(
        costMatchData => this.costMatches = costMatchData,
        error => {
          alert(error);
          console.log(error);
        },
        () => console.log('Costmatches retrieved')
      )
  }

  displayVatTypeSelector() {
    return this.costMatch.costType != CostType.BUSINESS_FOOD;
  }

  private checkTransactions(): void {
    this.transactionsUnmatched = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].costCharacter === CostCharacter.UNKNOWN) {
        this.transactionsUnmatched++;
      }
    }

    this.transactionTable.config.filtering.onlyUnknown = this.transactionsUnmatched > 0;
  }

  fileChangeEvent(fileInput: any){
    this.uploadedFile = fileInput.target.files[0];
    let reader = new FileReader();
    reader.onload = file => {
      let contents: any = file.target;
      this.importedText = contents.result;
      this.transactions = this.transactions.concat(this.importListService.convert(this.importedText));
      this.transactions = this.costMatchService.match(this.transactions, this.costMatches);
      this.transactionsLoaded = this.transactions.length;
      this.transactionTable.length = this.transactions.length;
      if (this.transactionsLoaded) {
        this.checkTransactions();
        this.updateTotalVat();
        this.transactionTable.data = this.transactions;
        this.transactionTable.onChangeTable(this.transactionTable.config);
      }
    };
    reader.readAsText(this.uploadedFile);

  }

  handleFilterChange(filterString: string) {
    this.filterString = filterString;
  }

  public addMatch():void {
    this.costMatch.matchString = this.filterString;
    this.costMatchService.addMatch(this.costMatch);
    this.costMatches = (<CostMatch[]>this.costMatches).concat(this.costMatch);
    this.transactions = this.costMatchService.match(this.transactions, this.costMatches);

    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].description.indexOf(this.filterString) > -1) {
        this.transactions[i].costTypeDescription = this.labelService.get(CostType[this.transactions[i].costType]);
        this.transactions[i].costCharacterDescription = this.labelService.get(CostCharacter[this.transactions[i].costCharacter]);
      }
    }
    this.checkTransactions();
    this.updateTotalVat();

    this.transactionTable.config.filtering.filterString = '';
    this.transactionTable.onChangeTable(this.transactionTable.config);
  }

  public addMatchDisabled():boolean {
    return !this.filterString  || this.filterString.length < 2;
  }

  private updateTotalVat():void {
    this.vatReport = VatCalculationService.calculateTotalVat(this.transactions);
  }

  public calculateVatDisabled():boolean {
    return this.transactionsUnmatched > 0;
  }
}