import {Component, Input} from "@angular/core";
import {VatReport, FiscalReport} from "../../shared/services/vat-calculation.service";

@Component({
    moduleId: module.id,
    selector: 'fiscal-report',
    templateUrl: 'fiscal-report.component.html'
})
export class FiscalReportComponent {
    @Input() fiscalReport:FiscalReport;
}