import {Component, EventEmitter, Output} from "@angular/core";
import {Http} from "@angular/http";
import {contentHeaders} from "../../common/headers";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {RegisterService} from "../services/register.service";

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.css']
})

export class LoginComponent {
  @Output() userChanged: EventEmitter<string> = new EventEmitter<string>();
  private loggedIn = false;

  constructor(public registerService: RegisterService, private http: Http, private router: Router, private location: Location) {}

  login(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    this.http.post('http://localhost:8080/auth', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.json().token);
          this.loggedIn = true;
          this.userChanged.emit(username);
          // this.router.parent.navigateByUrl('/vat');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.userChanged.emit("niet ingelogd");
    this.loggedIn = false;
    this.router.navigateByUrl('/')
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  editRegistration() {
    this.router.navigateByUrl('/register-edit');
  }

  public deleteRegistration(): void {
    if (confirm("Weet je zeker dat je je account wilt verwijderen? Alle gegevens worden direct verwijderd.")) {
      this.registerService.deleteRegistration();
      this.logout();
    }
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  signup(event) {
    event.preventDefault();
    // this.router.parent.navigateByUrl('/signup');
  }

  isHidden() {
    let list = ["/register"],
        route = this.location.path();

    return (list.indexOf(route) > -1) || this.loggedIn;
  }
}
