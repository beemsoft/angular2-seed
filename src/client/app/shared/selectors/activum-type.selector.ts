import {Component, Output, EventEmitter, Pipe, PipeTransform, Input} from "@angular/core";
import {LabelService} from "../services/label.service";
import {ActivumType, Activum} from "../services/activum.service";

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  constructor(private labelService: LabelService) {}

  transform(value, args:string[]) : any {
    let keys = [];
    for (var enumMember in value) {
      var isValueProperty = parseInt(enumMember, 10) >= 0;
      if (isValueProperty) {
        keys.push({key: enumMember, value: this.labelService.get(value[enumMember])});
      }
    }
    return keys;
  }
}

@Component({
  selector: 'activum-type-selector',
  pipes: [KeysPipe],
  providers: [LabelService],
  template: `<div>
    <select #sel (change)="select.emit(sel.value)">
      <option *ngFor="let item of activumTypes | keys" [value]="item.key" [selected]="activumTypes[selectedActivum.balanceType] == item.key">{{item.value}}
      </option>
    </select>
  </div>`
})
export class ActivumTypeSelector {
  activumTypes = ActivumType;
  @Input() selectedActivum = new Activum();
  @Output() select = new EventEmitter();
}
