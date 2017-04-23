import {Http, ResponseContentType} from "@angular/http";
import {contentHeaders} from "../../common/headers";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {Project} from "./project.service";
import * as moment from "moment/moment";

export class Invoice {
  id: number;
  invoiceNumber: string;
  project: Project = new Project();
  unitsOfWork: number;
  sent: moment.Moment;
}

@Injectable()
export class InvoiceService {

  constructor(private http: Http) {}

  addInvoice(invoice: Invoice) {
    let body = JSON.stringify(invoice);
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.post('http://localhost:8080/auth/invoice', body, { headers: contentHeaders })
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

  getInvoices(): Observable<Invoice> {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    return this.http.get('http://localhost:8080/auth/invoice', { headers: contentHeaders })
        .map(res => <Invoice> res.json())
        .catch(this.handleError);
  }

  getIncomeForLatestPeriod(): Observable<Invoice> {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    return this.http.get('http://localhost:8080/auth/invoice/latest-period', { headers: contentHeaders })
        .map(res => <Invoice> res.json())
        .catch(this.handleError);
  }

  deleteInvoice(invoice: Invoice) {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.delete('http://localhost:8080/auth/invoice/'+invoice.id, { headers: contentHeaders })
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

  updateInvoice(invoice: Invoice) {
    let body = JSON.stringify(invoice);
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    let url = 'http://localhost:8080/auth/invoice';
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

  createInvoicePdf(invoice: Invoice): any {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    let url = 'http://localhost:8080/auth/invoice/' + invoice.id;
    return this.http.get(url, {headers: contentHeaders, responseType: ResponseContentType.ArrayBuffer}).map(
      (res) => {
        return new Blob([res.blob()], {type: 'application/pdf'})
      });
  }

  /**
   * Handle HTTP error
   */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
