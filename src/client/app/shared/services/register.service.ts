import {Http} from "@angular/http";
import {contentHeaders} from "../../common/headers";
import {LabelService} from "./label.service";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import Collection = _.Collection;
import * as moment from "moment";

export enum DeclarationPeriod {
  QUARTERLY,
  YEARLY
}

class PersonalData {
  initials: string;
  prefix: string;
  surname: string;
  email: string;
}

class CompanyData {
  address: string;
  zipCode: string;
  city: string;
  chamberOfCommerceNumber: number;
}

class FiscalData {
  vatNumber: number;
  declarationPeriod: DeclarationPeriod;
}

export class Registration {
  registrationDate: moment.Moment;
  personalData: PersonalData = new PersonalData();
  companyData: CompanyData = new CompanyData();
  fiscalData: FiscalData = new FiscalData();
}

@Injectable()
export class RegisterService {

  constructor(private http: Http) {}

  register(registration: Registration) {
    let body = JSON.stringify(registration);
    this.http.post('http://localhost:8080/register', body)
      .subscribe(
        response => {
          // localStorage.setItem('jwt', response.json().id_token);
          // this.router.parent.navigateByUrl('/vat');
        },
        error => {
          alert(error);
          console.log(error);
        }
      );
  }

  getRegistration(registration: Registration): Observable<Registration> {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    return this.http.get('http://localhost:8080/auth/registration/'+registration.id, { headers: contentHeaders })
        .map(res => <Registration> res.json())
        .catch(this.handleError);
  }

  deleteRegistration(registration: Registration) {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.delete('http://localhost:8080/auth/register/'+registration.id, { headers: contentHeaders })
      .subscribe(
        response => {
          // localStorage.setItem('jwt', response.json().id_token);
          // this.router.parent.navigateByUrl('/vat');
        },
        error => {
          alert(error);
          console.log(error);
        }
      );
  }

  /**
   * Handle HTTP error
   */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
