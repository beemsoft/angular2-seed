import {Transaction, CostCharacter, CostType, VatType} from "./import-list.service";
import {Injectable} from "@angular/core";
import * as moment from "moment/moment";

export class FiscalReport  {
  firstTransactionDate: string;
  latestTransactionDate: string;
  accountNumbers: string[] = [];
  totalCarCosts: number;
  totalTransportCosts: number;
  totalOfficeCosts: number;
  totalFoodCosts: number;
  totalOtherCosts: number;
}

export class VatReport extends FiscalReport {
  totalVatIn: number;
  totalVatOut: number;
  paidInvoices: number;
}

@Injectable()
export class VatCalculationService {

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

  static calculateTotalVat(transactions:Array<Transaction>): VatReport {
    let totalVatIn:number = 0, totalVatOut:number = 0, paidInvoices:number = 0;
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
            paidInvoices += transactions[i].amount;
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
        totalVatIn += vatIn;
      }
    }
    let vatReport = new VatReport();
    vatReport.totalVatIn = Math.round(totalVatIn * 100) / 100;
    vatReport.totalVatOut = Math.round(totalVatOut * 100) / 100;
    vatReport.paidInvoices = paidInvoices;
    vatReport.totalOfficeCosts = Math.round(totalOfficeCosts * 100) / 100;
    vatReport.totalCarCosts = Math.round(totalCarCosts * 100) / 100;
    vatReport.totalTransportCosts = Math.round(totalTransportCosts * 100) / 100;
    vatReport.totalFoodCosts = Math.round(totalFoodCosts * 100) / 100;
    vatReport.totalOtherCosts = Math.round(totalOtherCosts * 100) / 100;
    return vatReport;
  }
}
