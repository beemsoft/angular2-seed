import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {CommonModule} from "@angular/common";
import {VatComponent} from "./vat.component";
import {SharedModule} from "../../shared/shared.module";
import {CostMatchService} from "../../shared/services/cost-match.service";
import {Ng2TableModule} from "ng2-table/ng2-table";
import {PaginationModule} from "ng2-bootstrap/ng2-bootstrap";
import {VatCalculationService} from "../../shared/services/vat-calculation.service";
import {TransactionTableComponent} from "./transaction-table.component";
import {VatReportComponent} from "./vat-report.component";
import {FiscalReportComponent} from "./fiscal-report.component";

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      Ng2TableModule,
      PaginationModule,
    ],
    declarations: [
      VatComponent,
      TransactionTableComponent,
      VatReportComponent,
      FiscalReportComponent
    ],
    exports: [VatComponent],
    providers: [
      CostMatchService,
      VatCalculationService,
      TransactionTableComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class VatModule { }
