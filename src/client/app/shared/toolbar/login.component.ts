import {Component, EventEmitter, Output} from "@angular/core";
import {Http} from "@angular/http";
import {contentHeaders} from "../../common/headers";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Config} from "../config/env.config";

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.css']
})

export class LoginComponent {
  private baseURL: string = Config.API;
  @Output() userChanged2: EventEmitter<string> = new EventEmitter<string>();
  private loggedIn = false;

  constructor(private http: Http, private router: Router, private location: Location) {}

  login(event: any, username: string, password: string) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    this.http.post(this.baseURL+'/auth', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.json().token);
          this.loggedIn = true;
          this.userChanged2.emit(username);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  signup(event: any) {
    event.preventDefault();
  }

  isHidden() {
    let list = ["/register"],
        route = this.location.path();

    return (list.indexOf(route) > -1) || this.loggedIn;
  }

  handleUserChange2() {
    this.userChanged2.emit("niet ingelogd");
    this.loggedIn = false;
    this.router.navigateByUrl('/')
  }
}
