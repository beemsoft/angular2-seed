import {Component, Input, EventEmitter, Output, ViewChild} from "@angular/core";
import {CostMatch, CostMatchService} from "../../shared/services/cost-match.service";
import {CostType} from "../../shared/services/import-list.service";

@Component({
  moduleId: module.id,
  selector: 'match-table',
  templateUrl: 'match-table.component.html'
})
export class CostMatchTableComponent {
  @Input() rows:Array<any> = [];
  @Input() data:Array<any>;
  @Input() length:number = 0;
  @Output() rowDeleted:EventEmitter<any> = new EventEmitter();
  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('myModal') public childModal:any;

  costTypes = CostType;

  public selectedMatch:CostMatch = new CostMatch();

  public columns:Array<any> = [
    {title: 'Id', name: 'id'},
    {title: 'Match', name: 'matchString'},
    {title: 'Type', name: 'costTypeDescription'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public numPages:number = 1;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns, sortType: 'alphabetic'},
    filtering: {filterString: '', columnName: 'matchString'}
  };

  constructor(
    public costMatchService: CostMatchService
  ) {}

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '') {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting2
    return data.sort((previous:any, current:any) => {
      if (this.config.sorting.sortType === 'alphabetic') {
        if (previous[columnName] > current[columnName]) {
          return sort === 'desc' ? -1 : 1;
        } else if (previous[columnName] < current[columnName]) {
          return sort === 'asc' ? -1 : 1;
        }
        return 0;
      }
    });
  }

  public changeFilter(data:any, config:any):any {
    if (!config.filtering) {
      return data;
    }

    this.filterChanged.emit(this.config.filtering.filterString);

    return data.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString)
    );
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.length = this.data.length;
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
  }

  public onCellClick(event:Event):void {
    this.selectedMatch = event.row;
    this.showChildModal();
  }

  public showChildModal():void {
    this.childModal.open();
  }

  public hideChildModal():void {
    this.childModal.close();
  }

  public deleteMatch():void {
    let index = this.rows.indexOf(this.selectedMatch);
    this.rows.splice(index, 1);
    this.costMatchService.deleteMatch(this.selectedMatch);
    this.hideChildModal();
  }

  public updateMatch():void {
    this.costMatchService.updateMatch(this.selectedMatch);
    this.hideChildModal();
  }
}
