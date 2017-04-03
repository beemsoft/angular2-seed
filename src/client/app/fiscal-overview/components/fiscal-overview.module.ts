import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {PaginationModule, ModalModule} from "ng2-bootstrap/ng2-bootstrap";
import {Ng2TableModule} from "ng2-table/ng2-table";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {FiscalOverviewComponent} from "./fiscal-overview.component";
import {FiscalOverviewService} from "../../shared/services/fiscal-overview.service";

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      Ng2TableModule,
      PaginationModule,
      ModalModule
    ],
    declarations: [
      FiscalOverviewComponent
    ],
    exports: [FiscalOverviewComponent],
    providers: [
      FiscalOverviewService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class FiscalOverviewModule { }
