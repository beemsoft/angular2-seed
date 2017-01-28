import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'display-user',
  templateUrl: 'display-user.component.html',
  styleUrls: ['display-user.component.css'],
})

export class DisplayUserComponent {
  @Input() user:string;

  handleUserChange(user: string) {
    this.user = user;
  }
}
