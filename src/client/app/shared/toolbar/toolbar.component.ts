import {Component} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent {
  private user:string = "nog niet ingelogd";

  handleUserChange(user: string) {
    this.user = user;
  }
}

