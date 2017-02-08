import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {Project, ProjectService} from "../services/project.service";

@Component({
  moduleId: module.id,
  selector: 'project-selector',
  template: `<div>
    <select #sel (change)="select.emit(sel.value)">
      <option *ngFor="let item of projects" [value]="item.id">{{item.code}}
      </option>
    </select>
  </div>`
})
export class ProjectSelector implements OnInit {
  private projects: Array<Project> = [];
  @Output() select = new EventEmitter();

  constructor(
      public projectService: ProjectService
  ) {}

  ngOnInit() {
    this.projectService.getProjects()
        .subscribe(
            projectData => {
              this.projects = projectData;
              this.select.emit(this.projects[0].id);
            },
            error => {
              alert(error);
              console.log(error);
            },
            () => console.log('Projects retrieved: ' + this.projects.length)
        )
  }
}
