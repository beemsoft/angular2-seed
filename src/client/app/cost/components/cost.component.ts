import {Component, OnInit} from '@angular/core';
import {Cost, CostService} from "../../shared/services/cost.service";
import {CostTableComponent} from "./cost-table.component";
import moment = require("moment");
import {LabelService} from "../../shared/services/label.service";
import {CostType} from "../../shared/services/import-list.service";

@Component({
  moduleId: module.id,
  selector: 'cost',
  templateUrl: 'cost.component.html'
})
export class CostComponent implements OnInit {
  private costs: Array<Cost> = [];
  public cost: Cost;

  constructor(
    public costService: CostService,
    public costTable: CostTableComponent,
    private labelService: LabelService
  ) {
    this.cost = new Cost();
  }

  ngOnInit() {
    this.costs = this.costService.getCosts()
      .subscribe(
        costData => {
          this.costs = costData;
          this.costs.forEach((cost) => {
              cost.costTypeDescription = this.labelService.get(CostType[cost.costType.id]);
          });
          this.costTable.data = this.costs;
          this.costTable.config.filtering.filterString = '';
          this.costTable.onChangeTable(this.costTable.config);
        },
        error => {
          alert(error);
          console.log(error);
        },
        () => console.log('Costs retrieved: ' + this.costs.length)
      )
  }

  public addCost():void {
    this.costService.addCost(this.cost);
    this.costs = (<Cost[]>this.costs).concat(this.cost);

    this.costTable.data = this.costs;
    this.costTable.config.filtering.filterString = '';
    this.costTable.onChangeTable(this.costTable.config);
  }
}
