import {VatType} from "./import-list.service";
import {Http} from "@angular/http";
import {contentHeaders} from "../../common/headers";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {Customer} from "./customer.service";
import * as moment from "moment/moment";
import Collection = _.Collection;

export class Project {
  customer: Customer;
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

  constructor(private http: Http) {}

  addProject(project: Project) {
    let body = JSON.stringify(project);
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.post('http://localhost:8080/auth/project', body, { headers: contentHeaders })
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
    return this.http.get('http://localhost:8080/auth/match', { headers: contentHeaders })
        .map(res => <Project> res.json())
        .catch(this.handleError);
  }

  deleteProject(project: Project) {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.delete('http://localhost:8080/auth/project/'+project.id, { headers: contentHeaders })
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
    let url = 'http://localhost:8080/auth/project';
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
