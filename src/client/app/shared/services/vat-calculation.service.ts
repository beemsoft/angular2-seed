import {CostCharacter, CostType, Transaction, VatType} from "./import-list.service";
import {Injectable} from "@angular/core";
import {ActivumService} from "./activum.service";
import {Observable} from "rxjs/Observable";
import {Invoice, InvoiceService} from "./invoice.service";

export class FiscalReport  {
  firstTransactionDate: string;
  latestTransactionDate: string;
  accountNumbers: string[] = [];
  totalCarCosts: number = 0;
  totalTransportCosts: number = 0;
  totalOfficeCosts: number = 0;
  totalFoodCosts: number = 0;
  totalOtherCosts: number = 0;
}

export class VatReport extends FiscalReport {
  totalVatIn: number = 0;
  totalVatOut: number = 0;
  carVatCorrection: number = 0;
  vatSaldo: number = 0;
  sentInvoices: number = 0;
  totalNetIn: number = 0;
}

@Injectable()
export class VatCalculationService {
  private invoices: Invoice[];

  constructor(
    private activumService: ActivumService,
    private invoiceService: InvoiceService
  ) {}

  static applyVat(transaction:Transaction, vatType:number): Transaction {
    transaction.amountNet = Math.round((transaction.amount / (1 + (vatType / 100))) * 100) / 100;
    transaction.amountVat = Math.round((transaction.amount - transaction.amountNet) * 100 ) / 100;
    return transaction;
  }

  static applyPercentage(transaction:Transaction, percentage:number): Transaction {
    transaction.amountNet = Math.round(transaction.amountNet * percentage) / 100;
    transaction.amountVat = Math.round(transaction.amountVat * percentage) / 100;
    return transaction
  }

  static applyFixedAmount(transaction:Transaction, fixedAmount:number): Transaction {
    transaction.amountNet = fixedAmount;
    if (transaction.costMatch.vatType === VatType[VatType.HIGH]) {
      transaction.amountVat = Math.round(fixedAmount * 21) / 100;
    } else if (transaction.costMatch.vatType === VatType[VatType.LOW]) {
      transaction.amountVat = Math.round(fixedAmount * 6) / 100;
    }
    return transaction;
  }

  calculateTotalVat(transactions:Array<Transaction>): Observable<VatReport> {
    let totalVatOut:number = 0, sentInvoices:number = 0;
    let totalCarCosts:number = 0, totalTransportCosts:number = 0, totalOfficeCosts:number =0, totalFoodCosts:number = 0, totalOtherCosts:number =0;

    function applyVat(transaction:Transaction): Transaction {
      if (transaction.costMatch.vatType === VatType[VatType.HIGH]) {
        return VatCalculationService.applyVat(transaction, 21);
      } else if (transaction.costMatch.vatType === VatType[VatType.LOW]) {
        return VatCalculationService.applyVat(transaction, 6);
      } else {
        return VatCalculationService.applyVat(transaction, 0);
      }
    }

    for (let i = 0; i < transactions.length; i++) {
      if (CostCharacter[transactions[i].costCharacter] === CostCharacter.IGNORE) {
        transactions[i].amountNet = "n.v.t.";
        transactions[i].amountVat = "n.v.t.";
      } else {
        let vatIn = 0, vatOut = 0, transaction:Transaction;
        switch (CostType[transactions[i].costType]) {
          case CostType.BUSINESS_FOOD:
            transaction = VatCalculationService.applyVat(transactions[i], 0);
            totalFoodCosts += transaction.amountNet;
            break;
          case CostType.INVOICE_PAID:
            transactions[i].amountNet = "n.v.t.";
            transactions[i].amountVat = "n.v.t.";
            sentInvoices += transactions[i].amount;
            break;
          default:
            if (transactions[i].costMatch != null && transactions[i].costMatch.vatType != null) {
              if (transactions[i].costMatch.fixedAmount > 0) {
                transaction = VatCalculationService.applyFixedAmount(transactions[i], transactions[i].costMatch.fixedAmount);
              } else {
                transaction = applyVat(transactions[i]);
                if (transactions[i].costMatch.percentage > 0) {
                  transaction = VatCalculationService.applyPercentage(transactions[i], transactions[i].costMatch.percentage);
                }
              }
              vatOut = transaction.amountVat;
              if (CostType[transactions[i].costType] === CostType.BUSINESS_CAR) {
                totalCarCosts += transaction.amountNet;
              } else if (CostType[transactions[i].costType] === CostType.TRAVEL_WITH_PUBLIC_TRANSPORT) {
                totalTransportCosts += transaction.amountNet;
              } else if (CostType[transactions[i].costType] === CostType.OFFICE) {
                totalOfficeCosts += transaction.amountNet;
              } else if (CostType[transactions[i].costType] === CostType.GENERAL_EXPENSE) {
                totalOtherCosts += transaction.amountNet;
              }
            }
            break;
        }
        totalVatOut += vatOut;
      }
    }

    return this.activumService.getActivumCar()
      .map(
        carData => {
          let vatReport = new VatReport();

          this.invoiceService.getIncomeForLatestPeriod()
          .subscribe(
            invoiceData => {
              this.invoices = invoiceData;
              this.invoices.forEach((invoice: Invoice) => {
                let netIn = invoice.unitsOfWork * invoice.project.rate;
                vatReport.totalNetIn += netIn;
                vatReport.totalVatIn += netIn * .21;
              });
              vatReport.totalVatIn = Math.round(vatReport.totalVatIn * 100) / 100;
              vatReport.totalNetIn = Math.round(vatReport.totalNetIn * 100) / 100;
              vatReport.carVatCorrection = carData.vatCorrectionForPrivateUsage;
              vatReport.totalVatOut = Math.round(totalVatOut * 100) / 100;
              vatReport.vatSaldo = Math.round(vatReport.totalVatIn - vatReport.totalVatOut + vatReport.carVatCorrection);
              vatReport.sentInvoices = sentInvoices;
              vatReport.totalOfficeCosts = Math.round(totalOfficeCosts * 100) / 100;
              vatReport.totalCarCosts = Math.round(totalCarCosts * 100) / 100;
              vatReport.totalTransportCosts = Math.round(totalTransportCosts * 100) / 100;
              vatReport.totalFoodCosts = Math.round(totalFoodCosts * 100) / 100;
              vatReport.totalOtherCosts = Math.round(totalOtherCosts * 100) / 100;
            },
            error => {
              alert(error);
              console.log(error);
            },
            () => console.log('Invoices retrieved')
          );

          return vatReport;
        }
      );
  }
}
