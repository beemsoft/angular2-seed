import {VatType} from "./import-list.service";
import {Http} from "@angular/http";
import {contentHeaders} from "../../common/headers";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {Customer} from "./customer.service";
import * as moment from "moment/moment";
import Collection = _.Collection;
import {Config} from "../config/env.config";

export class Project {
  id: number;
  customer: Customer = new Customer();
  code: string;
  projectDescription: string;
  activityDescription: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  rate: number;
  paymentTermDays: number;
  vatType: VatType;
}

@Injectable()
export class ProjectService {
  private baseURL: string = Config.API;

  constructor(private http: Http) {}

  addProject(project: Project) {
    let body = JSON.stringify(project);
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.post(this.baseURL+'/auth/project', body, { headers: contentHeaders })
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

  getProjects(): Observable<Project> {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    return this.http.get(this.baseURL+'/auth/project', { headers: contentHeaders })
        .map(res => <Project> res.json())
        .catch(this.handleError);
  }

  getProject(id: number): Observable<Project> {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    return this.http.get(this.baseURL+'/auth/project/'+  id, { headers: contentHeaders })
        .map(res => <Project> res.json())
        .catch(this.handleError);
  }

  deleteProject(project: Project) {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.delete(this.baseURL+'/auth/project/'+project.id, { headers: contentHeaders })
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

  updateProject(project: Project) {
    let body = JSON.stringify(project);
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    let url = this.baseURL+'/auth/project';
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
