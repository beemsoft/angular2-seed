import {Component, OnInit} from "@angular/core";
import {FiscalOverviewService} from "../../shared/services/fiscal-overview.service";
import moment = require("moment");

@Component({
  moduleId: module.id,
  selector: 'fiscal-overview',
  templateUrl: 'fiscal-overview.component.html'
})
export class FiscalOverviewComponent implements OnInit {

  constructor(
    public fiscalOverviewService: FiscalOverviewService
  ) {}

  ngOnInit() {
    this.fiscalOverviewService.getFiscalOverview()
      .subscribe(
        fiscalOverviewData => {
        },
        error => {
          alert(error);
          console.log(error);
        },
        () => console.log('Fiscal overview retrieved')
      )
  }
}
