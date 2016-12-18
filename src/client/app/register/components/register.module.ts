import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ModalModule} from "ng2-bootstrap/ng2-bootstrap";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {RegisterComponent} from "./register.component";
import {RegisterService} from "../../shared/services/register.service";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ModalModule
    ],
    declarations: [
        RegisterComponent
    ],
    exports: [RegisterComponent],
    providers: [
        RegisterService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class RegisterModule { }