import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Ng2TableModule} from "ng2-table/ng2-table";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {FiscalOverviewComponent} from "./fiscal-overview.component";
import {FiscalOverviewService} from "../../shared/services/fiscal-overview.service";
import {ModalModule} from "ngx-modal/index";

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      Ng2TableModule,
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
