import {Http} from "@angular/http";
import {contentHeaders} from "../../common/headers";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {VatReport} from "./vat-calculation.service";
import {Config} from "../config/env.config";

@Injectable()
export class FiscalOverviewService {
  private baseURL: string = Config.API;

  constructor(private http: Http) {}

  getFiscalOverview(): Observable<any> {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    return this.http.get(this.baseURL+'/auth/fiscal-overview', { headers: contentHeaders })
        .catch(this.handleError);
  }

  sendFiscalData(vatReport: VatReport) {
    let body = JSON.stringify(vatReport);
    console.log(vatReport.latestTransactionDate);
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.post(this.baseURL+'/auth/fiscal-overview', body, {headers: contentHeaders})
      .subscribe(
        response => {
          // localStorage.setItem('jwt', response.json().id_token);
          // this.router.parent.navigateByUrl('/vat');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  sendVatDeclaration() {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.get(Config.DIGIPOORT_API+'/bericht-soorten?fiscalNumber=', {headers: contentHeaders})
      .subscribe(
        response => {
          // localStorage.setItem('jwt', response.json().id_token);
          // this.router.parent.navigateByUrl('/vat');
        },
        error => {
          alert(error.text());
          console.log(error.text());
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
