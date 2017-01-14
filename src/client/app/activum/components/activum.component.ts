import {Component, OnInit} from "@angular/core";
import {Activum, ActivumService, BusinessCar, Office, ActivumType} from "../../shared/services/activum.service";
import {ActivumTableComponent} from "./activum-table.component";
import {LabelService} from "../../shared/services/label.service";
@Component({
    moduleId: module.id,
    selector: 'activum',
    templateUrl: 'activum.component.html'
})
export class ActivumComponent implements OnInit {
    private activumTypes = ActivumType;
    private activa: Array<Activum> = [];
    public activum: Activum;

    constructor(public activumService: ActivumService,
                public activumTable: ActivumTableComponent,
                private labelService: LabelService) {
        this.activum = new Activum();
    }

    ngOnInit() {
        this.activa = this.activumService.getActiva()
            .subscribe(
                activumData => {
                    this.activa = activumData;
                    this.activa.forEach((activum) => {
                        activum.balanceTypeDescription = this.labelService.get(activum.balanceType);
                    });
                    this.activumTable.data = this.activa;
                    this.activumTable.config.filtering.filterString = '';
                    this.activumTable.onChangeTable(this.activumTable.config);
                },
                error => {
                    alert(error);
                    console.log(error);
                },
                () => console.log('Activa retrieved: ' + this.activa.length)
            )
    }

    public addActivum(balanceType: ActivumType): void {
        if (balanceType == ActivumType.CAR) {
            this.activumService.addActivumCar(<BusinessCar>this.activum);
        } else if (balanceType == ActivumType.OFFICE) {
            this.activumService.addActivumOffice(<Office>this.activum);
        } else {
            this.activumService.addActivum(this.activum);
        }
        this.activa = (<Activum[]>this.activa).concat(this.activum);

        this.activumTable.data = this.activa;
        this.activumTable.config.filtering.filterString = '';
        this.activumTable.onChangeTable(this.activumTable.config);
    }
}