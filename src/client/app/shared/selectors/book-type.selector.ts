import {Component, Output, EventEmitter, Pipe, PipeTransform, Input} from '@angular/core'
import {LabelService} from "../services/label.service";
import {BookType, BookValue} from "../services/book.service";

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
  selector: 'book-type-selector',
  pipes: [KeysPipe],
  providers: [LabelService],
  template: `<div>
    <select #sel (change)="select.emit(sel.value)">
      <option *ngFor="let item of bookTypes | keys" [value]="item.key" [selected]="bookTypes[selectedBookValue.balanceType] == item.key">{{item.value}}
      </option>
    </select>
  </div>`
})
export class BookTypeSelector {
  bookTypes = BookType;
  @Input() selectedBookValue = new BookValue();
  @Output() select = new EventEmitter();
}
