import {Component, OnInit} from "@angular/core";
import {Registration, RegisterService} from "../../shared/services/register.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    public registration: Registration;
    public trialPeriodEndDate: string;

    constructor(public registerService: RegisterService, private router: Router) {
        this.registration = new Registration();
    }

    ngOnInit(): void {
        this.trialPeriodEndDate = this.registerService.getLastDayOfFirstMonthOfNextQuarter().format('DD-MM-YYYY');
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