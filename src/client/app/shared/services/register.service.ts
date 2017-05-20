import {Http} from "@angular/http";
import {contentHeaders} from "../../common/headers";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import Collection = _.Collection;
import * as moment from "moment";
import {Config} from "../config/env.config";

export enum DeclarationPeriod {
  QUARTERLY,
  YEARLY
}

class PersonalData {
  initials: string;
  prefix: string;
  surname: string;
  email: string;

  getFullName():string {
    return this.initials.concat(' ', this.prefix, ' ', this.surname);
  }
}

class CompanyData {
  companyName: string;
  address: string;
  zipCode: string;
  city: string;
  accountNumber: string;
  chamberOfCommerceNumber: number;
}

class FiscalData {
  vatNumber: number;
  declarationPeriod: DeclarationPeriod;
}

export class Registration {
  user: string;
  registrationDate: moment.Moment;
  personalData: PersonalData = new PersonalData();
  companyData: CompanyData = new CompanyData();
  fiscalData: FiscalData = new FiscalData();
}

@Injectable()
export class RegisterService {
  private baseURL: string = Config.API;

  constructor(private http: Http) {}

  getLastDayOfFirstMonthOfNextQuarter(): moment.Moment {
    let month = moment().month();
    let lastDay: moment.Moment;
    switch (month) {
      case 0:
      case 1:
      case 2:
      case 3:
        lastDay = moment().month(4).date(0);
        break;
      case 4:
      case 5:
      case 6:
        lastDay = moment().month(7).date(0);
        break;
      case 7:
      case 8:
      case 9:
        lastDay = moment().month(10).date(0);
        break;
      case 10:
      case 11:
        lastDay = moment().month(1).date(0);
        break;
    }
    return lastDay;
  }

  register(registration: Registration) {
    let body = JSON.stringify(registration);
    this.http.post(this.baseURL+'/register', body, { headers: contentHeaders })
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

  getRegistration(): Observable<Registration> {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    return this.http.get(this.baseURL+'/auth/register', { headers: contentHeaders })
        .map(res => <Registration> res.json())
        .catch(this.handleError);
  }

  updateRegistration(registration: Registration) {
    let body = JSON.stringify(registration);
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    let url = this.baseURL+'/auth/register';
    this.http.put(url, body, { headers: contentHeaders })
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

  deleteRegistration() {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.delete(this.baseURL+'/auth/register', { headers: contentHeaders })
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
