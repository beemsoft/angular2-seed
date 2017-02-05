import {Component, OnInit} from "@angular/core";
import {Customer, CustomerService} from "../../shared/services/customer.service";
import {CustomerTableComponent} from "./customer-table.component";
import moment = require("moment");

@Component({
  moduleId: module.id,
  selector: 'customer',
  templateUrl: 'customer.component.html'
})
export class CustomerComponent implements OnInit {
  private customers: Array<Customer> = [];
  public customer: Customer = new Customer();

  constructor(
    public customerService: CustomerService,
    public customerTable: CustomerTableComponent
  ) {}

  ngOnInit() {
    this.customerService.getCustomers()
      .subscribe(
        customerData => {
          this.customers = customerData;
          this.customerTable.data = this.customers;
          this.customerTable.config.filtering.filterString = '';
          this.customerTable.onChangeTable(this.customerTable.config);
        },
        error => {
          alert(error);
          console.log(error);
        },
        () => console.log('Customers retrieved: ' + this.customers.length)
      )
  }

  public addCustomer():void {
    this.customerService.addCustomer(this.customer);
    this.customers = (<Customer[]>this.customers).concat(this.customer);

    this.customerTable.data = this.customers;
    this.customerTable.config.filtering.filterString = '';
    this.customerTable.onChangeTable(this.customerTable.config);
  }
}
