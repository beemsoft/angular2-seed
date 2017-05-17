import {Component, Input, EventEmitter, Output, ViewChild} from "@angular/core";
import {Customer, CustomerService} from "../../shared/services/customer.service";

@Component({
  moduleId: module.id,
  selector: 'customer-table',
  templateUrl: 'customer-table.component.html'
})
export class CustomerTableComponent {
  @Input() rows:Array<any> = [];
  @Input() data:Array<any>;
  @Input() length:number = 0;
  @Output() rowDeleted:EventEmitter<any> = new EventEmitter();
  @ViewChild('myModal') public childModal:any;

  public selectedCustomer:Customer = new Customer();

  public columns:Array<any> = [
    {title: 'Naam', name: 'name'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public numPages:number = 1;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns, sortType: 'alphabetic'},
    filtering: {filterString: '', columnName: 'name'}
  };

  constructor(
    public customerService: CustomerService
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
    this.selectedCustomer = event.row;
    this.showChildModal();
  }

  public showChildModal():void {
    this.childModal.open();
  }

  public hideChildModal():void {
    this.childModal.close();
  }

  public deleteCustomer():void {
    let index = this.rows.indexOf(this.selectedCustomer);
    this.rows.splice(index, 1);
    this.customerService.deleteCustomer(this.selectedCustomer);
    this.hideChildModal();
  }

  public updateCustomer():void {
    this.customerService.updateCustomer(this.selectedCustomer);
    this.hideChildModal();
  }
}
