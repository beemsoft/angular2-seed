import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {RegisterComponent} from "./register.component";
import {RegisterService} from "../../shared/services/register.service";
import {RegisterEditComponent} from "./register-edit.component";
import {ModalModule} from "ngx-modal/index";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ModalModule
    ],
    declarations: [
        RegisterComponent,
        RegisterEditComponent
    ],
    exports: [
        RegisterComponent,
        RegisterEditComponent
    ],
    providers: [
        RegisterService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class RegisterModule { }