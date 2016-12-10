import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {CostComponent} from "./cost.component";
import {PaginationModule, ModalModule} from "ng2-bootstrap/ng2-bootstrap";
import {Ng2TableModule} from "ng2-table/ng2-table";
import {CostTableComponent} from "./cost-table.component";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {CostMatchComponent} from "./match.component";
import {CostMatchTableComponent} from "./match-table.component";
import {CostMatchService} from "../../shared/services/cost-match.service";

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      Ng2TableModule,
      PaginationModule,
      ModalModule
    ],
    declarations: [
      CostMatchComponent,
      CostMatchTableComponent
    ],
    exports: [CostMatchComponent],
    providers: [
      CostMatchService,
      CostMatchTableComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class CostMatchModule { }
