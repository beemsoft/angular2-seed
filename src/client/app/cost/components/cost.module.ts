import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CostComponent} from "./cost.component";
import {CostService} from "../../shared/services/cost.service";
import {PaginationModule} from "ng2-bootstrap/ng2-bootstrap";
import {Ng2TableModule} from "ng2-table/ng2-table";
import {CostTableComponent} from "./cost-table.component";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {ModalModule} from "ngx-modal/index";
import {MyDatePickerModule} from "mydatepicker";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      Ng2TableModule,
      PaginationModule,
      ModalModule,
      ReactiveFormsModule,
      MyDatePickerModule
    ],
    declarations: [
      CostComponent,
      CostTableComponent
    ],
    exports: [CostComponent],
    providers: [
      CostService,
      CostTableComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class CostModule { }
