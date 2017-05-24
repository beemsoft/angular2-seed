import {Component, OnInit} from "@angular/core";
import {Cost, CostService} from "../../shared/services/cost.service";
import {CostTableComponent} from "./cost-table.component";
import {CostType} from "../../shared/services/import-list.service";
import {IMyDpOptions} from "mydatepicker";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import moment = require("moment");

@Component({
  moduleId: module.id,
  selector: 'cost',
  templateUrl: 'cost.component.html'
})
export class CostComponent implements OnInit {
  public cost: Cost;
  myform: FormGroup;
  myDate: FormControl;
  amount: FormControl;
  vat: FormControl;
  description: FormControl;

  private myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Vandaag',
    dayLabels: {su: 'Zon', mo: 'Maa', tu: 'Din', we: 'Woe', th: 'Don', fr: 'Vrij', sa: 'Zat'},
    dateFormat: 'yyyy/mm/dd'
  };

  constructor(
    public costService: CostService,
    public costTable: CostTableComponent,
    private fb: FormBuilder
  ) {
    this.cost = new Cost();
    this.cost.costType = CostType.GENERAL_EXPENSE;
    this.cost.date = null;
  }

  ngOnInit() {
    this.costTable.getRows();
    this.createFormControls();
    this.createForm();
    this.setDate();
  }

  setDate(): void {
    // Set today date using the setValue function
    let date = new Date();
    this.myform.setValue({
      myDate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        },
        formatted: moment().format('YYYY/MM/DD')
      },
      amount: 0,
      vat: 0,
      description: ''
    });
  }

  createFormControls() {
    this.myDate = this.fb.control('', [
      Validators.required
    ]);
    this.amount = this.fb.control('', [
      Validators.pattern("\\d+(\\.\\d{2})?")
    ]);
    this.vat = this.fb.control('', [
      Validators.pattern("\\d+(\\.\\d{2})?")
    ]);
    this.description = this.fb.control('', [
      Validators.required
    ]);
  }

  createForm() {
    this.myform = this.fb.group({
      myDate: this.myDate,
      amount: this.amount,
      vat: this.vat,
      description: this.description
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      this.addCost();
    }
  }

  public addCost():void {
    let cost:Cost = this.myform.value;
    cost.date = this.myform.controls['myDate'].value.formatted;
    cost.costType = this.cost.costType;
    this.costService.addCost(cost)
      .subscribe(() => {
        this.costTable.getRows();
      });
  }
}
