import {Component} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent {
  private user:string = "inloggen s.v.p.";

  handleUserChange(user: string) {
    this.user = user;
  }
}

