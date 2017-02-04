import {Route} from "@angular/router";
import {RegisterComponent} from "./register.component";
import {RegisterEditComponent} from "./register-edit.component";

export const RegisterRoutes: Route[] = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register-edit',
    component: RegisterEditComponent
  }
];
