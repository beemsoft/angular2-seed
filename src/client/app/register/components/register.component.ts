import {Component, OnInit, ViewChild} from "@angular/core";
import {Registration, RegisterService} from "../../shared/services/register.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    public registration: Registration;
    public trialPeriodEndDate: string;
    public acceptedTermsAndConditions: boolean = false;
    @ViewChild('childModal') public childModal:ModalDirective;

    constructor(public registerService: RegisterService, private router: Router) {
        this.registration = new Registration();
    }

    ngOnInit(): void {
        this.trialPeriodEndDate = this.registerService.getLastDayOfFirstMonthOfNextQuarter().format('DD-MM-YYYY');
    }

    public register(): void {
        this.registerService.register(this.registration);
        this.router.navigateByUrl('/');
    }

    public editRegistration() {
        this.router.navigateByUrl('/register-edit');
    }

    public cancel() {
        this.router.navigateByUrl('/');
    }

    public showTermsAndConditions():void {
        this.childModal.show();
    }

    public hideChildModal():void {
        this.childModal.hide();
    }

    public accept():void {
        this.childModal.hide();
        this.acceptedTermsAndConditions = true;
    }
}