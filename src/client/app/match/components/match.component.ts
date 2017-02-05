import {Component, OnInit} from "@angular/core";
import {LabelService} from "../../shared/services/label.service";
import {CostType} from "../../shared/services/import-list.service";
import {CostMatch, CostMatchService} from "../../shared/services/cost-match.service";
import {CostMatchTableComponent} from "./match-table.component";
import moment = require("moment");

@Component({
  moduleId: module.id,
  selector: 'match',
  templateUrl: 'match.component.html'
})
export class CostMatchComponent implements OnInit {
  private costMatches: Array<CostMatch> = [];
  public costMatch: CostMatch = new CostMatch();
  private filterString: string;

  constructor(
    public costMatchService: CostMatchService,
    public costMatchTable: CostMatchTableComponent,
    private labelService: LabelService
  ) {}

  ngOnInit() {
    this.costMatchService.getMatches()
      .subscribe(
        costMatchData => {
          this.costMatches = costMatchData;
          this.costMatches.forEach((costMatch) => {
              costMatch.costTypeDescription = this.labelService.get(CostType[costMatch.costType.id]);
          });
          this.costMatchTable.data = this.costMatches;
          this.costMatchTable.config.filtering.filterString = '';
          this.costMatchTable.onChangeTable(this.costMatchTable.config);
        },
        error => {
          alert(error);
          console.log(error);
        },
        () => console.log('Costmatches retrieved: ' + this.costMatches.length)
      )
  }

  public addCostMatch():void {
    this.costMatch.matchString = this.filterString;
    this.costMatchService.addMatch(this.costMatch);
    this.costMatches = (<CostMatch[]>this.costMatches).concat(this.costMatch);

    this.costMatchTable.data = this.costMatches;
    this.costMatchTable.config.filtering.filterString = '';
    this.costMatchTable.onChangeTable(this.costMatchTable.config);
  }

    displayVatTypeSelector() {
        return this.costMatch.costType != CostType.BUSINESS_FOOD;
    }

    public addMatchDisabled():boolean {
        // return this.transactionTable.config.filtering.filterString.length < 2;
        return false;
    }

    handleFilterChange(filterString: string) {
        this.filterString = filterString;
    }
}
