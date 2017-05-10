import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Ng2TableModule} from "ng2-table/ng2-table";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {ActivumComponent} from "./activum.component";
import {ActivumTableComponent} from "./activum-table.component";
import {ActivumService} from "../../shared/services/activum.service";
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