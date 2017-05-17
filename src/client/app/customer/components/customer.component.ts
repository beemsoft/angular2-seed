import {Component, OnInit} from "@angular/core";
import {Customer, CustomerService} from "../../shared/services/customer.service";
import {CustomerTableComponent} from "./customer-table.component";
import moment = require("moment");
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'customer',
  templateUrl: 'customer.component.html'
})
export class CustomerComponent implements OnInit {
  private customers: Array<Customer> = [];
  public customer: Customer = new Customer();
  myform: FormGroup;
  name: FormControl;
  address: FormControl;
  email: FormControl;

  constructor(
    public customerService: CustomerService,
    public customerTable: CustomerTableComponent
  ) {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
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

  createFormControls() {
    this.name = new FormControl('', [
      Validators.required
    ]);
    this.address = new FormControl('', [
      Validators.required
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      name: this.name,
      address: this.address,
      email: this.email
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      this.addCustomer();
    }
  }

  private addCustomer():void {
    this.customerService.addCustomer(this.customer);
    this.customers = (<Customer[]>this.customers).concat(this.customer);

    this.customerTable.data = this.customers;
    this.customerTable.config.filtering.filterString = '';
    this.customerTable.onChangeTable(this.customerTable.config);
  }
}
