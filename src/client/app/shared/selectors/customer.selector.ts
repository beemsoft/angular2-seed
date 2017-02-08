import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {CustomerService, Customer} from "../services/customer.service";

@Component({
  moduleId: module.id,
  selector: 'customer-selector',
  template: `<div>
    <select #sel (change)="select.emit(sel.value)">
      <option *ngFor="let item of customers" [value]="item.id">{{item.name}}
      </option>
    </select>
  </div>`
})
export class CustomerSelector implements OnInit {
  private customers: Array<Customer> = [];
  @Output() select = new EventEmitter();

  constructor(
      public customerService: CustomerService
  ) {}

  ngOnInit() {
    this.customerService.getCustomers()
        .subscribe(
            customerData => {
              this.customers = customerData;
              this.select.emit(this.customers[0].id);
            },
            error => {
              alert(error);
              console.log(error);
            },
            () => console.log('Customers retrieved: ' + this.customers.length)
        )
  }
}
