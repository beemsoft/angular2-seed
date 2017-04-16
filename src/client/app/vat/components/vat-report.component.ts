import {Component, Input, OnInit} from "@angular/core";
import {VatReport} from "../../shared/services/vat-calculation.service";
import {FiscalOverviewService} from "../../shared/services/fiscal-overview.service";
import {Invoice, InvoiceService} from "../../shared/services/invoice.service";

@Component({
  moduleId: module.id,
  selector: 'vat-report',
  templateUrl: 'vat-report.component.html'
})
export class VatReportComponent implements OnInit {
  @Input() vatReport: VatReport;
  private invoices;

  constructor(private fiscalOverviewService: FiscalOverviewService, private invoiceService: InvoiceService) {
  };

  ngOnInit(): void {
    this.invoiceService.getIncomeForLatestPeriod()
      .subscribe(
        invoiceData => {
          this.invoices = invoiceData;
          this.invoices.forEach((invoice: Invoice) => {
            let netIn = invoice.unitsOfWork * invoice.project.rate;
            this.vatReport.totalNetIn += netIn;
            this.vatReport.totalVatIn += netIn * .21;
          });
          this.vatReport.totalVatIn = Math.round(this.vatReport.totalVatIn * 100) / 100;
          this.vatReport.totalNetIn = Math.round(this.vatReport.totalNetIn * 100) / 100;
        },
        error => {
          alert(error);
          console.log(error);
        },
        () => console.log('Invoices retrieved')
      )
  }


  public sendFiscalData(): void {
    this.fiscalOverviewService.sendFiscalData(this.vatReport);
  }
}