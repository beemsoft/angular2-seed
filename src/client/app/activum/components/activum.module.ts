import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {BookComponent} from "./book.component";
import {PaginationModule, ModalModule} from "ng2-bootstrap/ng2-bootstrap";
import {Ng2TableModule} from "ng2-table/ng2-table";
import {BookTableComponent} from "./book-table.component";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {ActivumComponent} from "./activum.component";
import {ActivumTableComponent} from "./activum-table.component";
import {ActivumService} from "../../shared/services/activum.service";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        Ng2TableModule,
        PaginationModule,
        ModalModule
    ],
    declarations: [
        ActivumComponent,
        ActivumTableComponent
    ],
    exports: [ActivumComponent],
    providers: [
        ActivumService,
        ActivumTableComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ActivumModule { }