import {Component, OnInit, ViewChild} from "@angular/core";
import {Registration, RegisterService} from "../../shared/services/register.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    public registration: Registration;
    public trialPeriodEndDate: string;
    public acceptedTermsAndConditions: boolean = false;
    @ViewChild('myModal') public childModal:any;
    myform: FormGroup;
    kvkNummer: FormControl;
    firstName: FormControl;
    prefix: FormControl;
    lastName: FormControl;
    userName: FormControl;
    email: FormControl;
    password: FormControl;

    constructor(public registerService: RegisterService, private router: Router) {
        this.registration = new Registration();
    }

    ngOnInit(): void {
        this.trialPeriodEndDate = this.registerService.getLastDayOfFirstMonthOfNextQuarter().format('DD-MM-YYYY');
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.kvkNummer = new FormControl('', [
          Validators.required,
          Validators.pattern("\\d{8}")
        ]);
        this.firstName = new FormControl('', [
          Validators.required,
          Validators.pattern("[a-zA-Z]+")
        ]);
        this.prefix = new FormControl();
        this.lastName = new FormControl('', [
          Validators.required,
          Validators.pattern("[a-zA-Z][a-zA-Z]+")
        ]);
        this.userName = new FormControl('', [
            Validators.required
        ]);
        this.email = new FormControl('', [
            Validators.required,
            Validators.pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]);
    }

    createForm() {
        this.myform = new FormGroup({
            kvkNummer: this.kvkNummer,
            name: new FormGroup({
                firstName: this.firstName,
                prefix: this.prefix,
                lastName: this.lastName,
            }),
            userName: this.userName,
            email: this.email,
            password: this.password
        });
    }

    onSubmit() {
        console.log(this.myform.valid);
        if (this.myform.valid) {
            this.registerService.register(this.registration);
            this.router.navigateByUrl('/');
        }
    }

    public editRegistration() {
        this.router.navigateByUrl('/register-edit');
    }

    public cancel() {
        this.router.navigateByUrl('/');
    }

    public showTermsAndConditions():void {
        this.childModal.open();
    }

    public hideChildModal():void {
        this.acceptedTermsAndConditions = false;
        this.childModal.close();
    }

    public accept():void {
        this.childModal.close();
        this.acceptedTermsAndConditions = true;
    }
}