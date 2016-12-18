import {Component} from "@angular/core";
import {LabelService} from "../../shared/services/label.service";
import {Registration, RegisterService} from "../../shared/services/register.service";
@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {
    public registration: Registration;

    constructor(public registerService: RegisterService,
                private labelService: LabelService) {
        this.registration = new Registration();
    }

    public register(): void {
        this.registerService.register(this.registration);
    }
}