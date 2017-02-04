import {Component} from "@angular/core";
import {Registration, RegisterService} from "../../shared/services/register.service";
import {Router} from "@angular/router";
@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {
    public registration: Registration;

    constructor(public registerService: RegisterService, private router: Router) {
        this.registration = new Registration();
    }

    public register(): void {
        this.registerService.register(this.registration);
    }

    public editRegistration() {
        this.router.navigateByUrl('/register-edit');
    }

    public cancel() {
        this.router.navigateByUrl('/');
    }
}