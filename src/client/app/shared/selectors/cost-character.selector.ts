import {Component, Output, EventEmitter, Input} from '@angular/core'
import {CostCharacter} from "../services/import-list.service";
import {KeysPipe} from "./cost-type.selector";

@Component({
  selector: 'cost-character-selector',
  pipes: [KeysPipe],
  template: `<div>
    <select #sel (change)="select.emit(sel.value)">
      <option *ngFor="let item of costCharacters | keys" [value]="item.key" [selected]="selectedCostCharacter == item.key">{{item.value}}
      </option>
    </select>
  </div>`
})
export class CostCharacterSelector {
  costCharacters = CostCharacter;
  @Input() selectedCostCharacter;
  @Output() select = new EventEmitter();
}
