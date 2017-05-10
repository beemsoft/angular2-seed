import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Ng2TableModule} from "ng2-table/ng2-table";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {InvoiceComponent} from "./invoice.component";
import {InvoiceTableComponent} from "./invoice-table.component";
import {InvoiceService} from "../../shared/services/invoice.service";
import {PdfViewerComponent} from "ng2-pdf-viewer";
import {ModalModule} from "ngx-modal/index";
import {PaginationModule} from "ng2-bootstrap/ng2-bootstrap";

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      Ng2TableModule,
      PaginationModule,
      ModalModule
    ],
    declarations: [
      InvoiceComponent,
      InvoiceTableComponent,
      PdfViewerComponent
    ],
    exports: [InvoiceComponent],
    providers: [
      InvoiceService,
      InvoiceTableComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class InvoiceModule { }
