import {Component, OnInit} from "@angular/core";
import {RegisterService, Registration} from "../../shared/services/register.service";

@Component({
  moduleId: module.id,
  selector: 'register-edit',
  templateUrl: 'register-edit.component.html'
})
export class RegisterEditComponent implements OnInit {
  public registration: Registration = new Registration();

  constructor(public registerService: RegisterService) {
  }

  ngOnInit() {
    this.registerService.getRegistration()
      .subscribe(
        registrationData => {
          this.registration = registrationData;
        },
        error => {
          alert(error);
          console.log(error);
        },
        () => console.log('Registration retrieved')
      )
  }

  public update(): void {
    this.registerService.updateRegistration(this.registration);
  }

  public delete(): void {
    this.registerService.deleteRegistration(this.registration);
  }
}