import {Component, OnInit} from "@angular/core";
import {Project, ProjectService} from "../../shared/services/project.service";
import {ProjectTableComponent} from "./project-table.component";
import moment = require("moment");
import {CustomerService} from "../../shared/services/customer.service";

@Component({
  moduleId: module.id,
  selector: 'project',
  templateUrl: 'project.component.html'
})
export class ProjectComponent implements OnInit {
  private projects: Array<Project> = [];
  public project: Project = new Project();

  constructor(
    public projectService: ProjectService,
    public projectTable: ProjectTableComponent,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.projectService.getProjects()
      .subscribe(
          projectData => {
          this.projects = projectData;
          this.projectTable.data = this.projects;
          this.projectTable.config.filtering.filterString = '';
          this.projectTable.onChangeTable(this.projectTable.config);
        },
        error => {
          alert(error);
          console.log(error);
        },
        () => console.log('Projects retrieved: ' + this.projects.length)
      )
  }

  public addProject():void {
    this.customerService.getCustomer(this.project.customer.id)
        .subscribe(
            customerData => {
                this.project.customer = customerData;
                this.projectService.addProject(this.project);
                this.projects = (<Project[]>this.projects).concat(this.project);

                this.projectTable.data = this.projects;
                this.projectTable.config.filtering.filterString = '';
                this.projectTable.onChangeTable(this.projectTable.config);
            },
            error => {
                alert(error);
                console.log(error);
            },
            () => console.log('Project added')
        );
  }
}
