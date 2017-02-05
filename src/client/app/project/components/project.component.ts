import {Component, OnInit} from "@angular/core";
import {Project, ProjectService} from "../../shared/services/project.service";
import {ProjectTableComponent} from "./project-table.component";
import moment = require("moment");

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
    public projectTable: ProjectTableComponent
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
    this.projectService.addProject(this.project);
    this.projects = (<Project[]>this.projects).concat(this.project);

    this.projectTable.data = this.projects;
    this.projectTable.config.filtering.filterString = '';
    this.projectTable.onChangeTable(this.projectTable.config);
  }
}
