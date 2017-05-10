import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Ng2TableModule} from "ng2-table/ng2-table";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {ProjectComponent} from "./project.component";
import {ProjectTableComponent} from "./project-table.component";
import {ProjectService} from "../../shared/services/project.service";
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
      ProjectComponent,
      ProjectTableComponent
    ],
    exports: [ProjectComponent],
    providers: [
      ProjectService,
      ProjectTableComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ProjectModule { }
