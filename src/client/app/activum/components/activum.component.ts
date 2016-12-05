import {Component, OnInit} from "@angular/core";
import {Activum, ActivumService} from "../../shared/services/activum.service";
import {ActivumTableComponent} from "./activum-table.component";
@Component({
    moduleId: module.id,
    selector: 'activum',
    templateUrl: 'activum.component.html'
})
export class ActivumComponent implements OnInit {
    private activa: Array<Activum> = [];
    public activum: Activum;

    constructor(public activumService: ActivumService,
                public activumTable: ActivumTableComponent) {
        this.activum = new Activum();
    }

    ngOnInit() {
        this.activa = this.activumService.getActiva()
            .subscribe(
                activumData => {
                    this.activa = activumData;
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

    public addActivum(): void {
        this.activumService.addActivum(this.activum);
        this.activa = (<Activum[]>this.activa).concat(this.activum);

        this.activumTable.data = this.activa;
        this.activumTable.config.filtering.filterString = '';
        this.activumTable.onChangeTable(this.activumTable.config);
    }
}