import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {PaginationModule, ModalModule} from "ng2-bootstrap/ng2-bootstrap";
import {Ng2TableModule} from "ng2-table/ng2-table";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {CustomerComponent} from "./customer.component";
import {CustomerTableComponent} from "./customer-table.component";
import {CustomerService} from "../../shared/services/customer.service";

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      Ng2TableModule,
      PaginationModule,
      ModalModule
    ],
    declarations: [
      CustomerComponent,
      CustomerTableComponent
    ],
    exports: [CustomerComponent],
    providers: [
      CustomerService,
      CustomerTableComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class CustomerModule { }
