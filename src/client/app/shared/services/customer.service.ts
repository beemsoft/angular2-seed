import {Http} from "@angular/http";
import {contentHeaders} from "../../common/headers";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {Config} from "../config/env.config";

export class Customer {
  id: number;
  name: string;
  address: string;
  emailInvoice: string;
  contact: string;
}

@Injectable()
export class CustomerService {
  private baseURL: string = Config.API;

  constructor(private http: Http) {}

  addCustomer(customer: Customer) {
    let body = JSON.stringify(customer);
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.post(this.baseURL+'/auth/customer', body, { headers: contentHeaders })
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

  getCustomers(): Observable<Customer> {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    return this.http.get(this.baseURL+'/auth/customer', { headers: contentHeaders })
      .map(res => <Customer> res.json())
      .catch(this.handleError);
  }

  getCustomer(id: number): Observable<Customer> {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    return this.http.get(this.baseURL+'/auth/customer/'+  id, { headers: contentHeaders })
        .map(res => <Customer> res.json())
        .catch(this.handleError);
  }

  deleteCustomer(customer: Customer) {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.delete(this.baseURL+'/auth/customer/'+customer.id, { headers: contentHeaders })
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

  updateCustomer(customer: Customer) {
    let body = JSON.stringify(customer);
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    let url = this.baseURL+'/auth/customer';
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
