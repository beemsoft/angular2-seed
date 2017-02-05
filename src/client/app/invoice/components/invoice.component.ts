import {Component, OnInit} from "@angular/core";
import {Customer} from "../../shared/services/customer.service";
import {Invoice, InvoiceService} from "../../shared/services/invoice.service";
import {InvoiceTableComponent} from "./invoice-table.component";
import moment = require("moment");

@Component({
  moduleId: module.id,
  selector: 'invoice',
  templateUrl: 'invoice.component.html'
})
export class InvoiceComponent implements OnInit {
  private invoices: Array<Customer> = [];
  public invoice: Invoice = new Invoice();

  constructor(
    public invoiceService: InvoiceService,
    public invoiceTable: InvoiceTableComponent
  ) {}

  ngOnInit() {
    this.invoiceService.getInvoices()
      .subscribe(
          invoiceData => {
          this.invoices = invoiceData;
          this.invoiceTable.data = this.invoices;
          this.invoiceTable.config.filtering.filterString = '';
          this.invoiceTable.onChangeTable(this.invoiceTable.config);
        },
        error => {
          alert(error);
          console.log(error);
        },
        () => console.log('Invoices retrieved: ' + this.invoices.length)
      )
  }

  public addInvoice():void {
    this.invoiceService.addInvoice(this.invoice);
    this.invoices = (<Customer[]>this.invoices).concat(this.invoice);

    this.invoiceTable.data = this.invoices;
    this.invoiceTable.config.filtering.filterString = '';
    this.invoiceTable.onChangeTable(this.invoiceTable.config);
  }
}
