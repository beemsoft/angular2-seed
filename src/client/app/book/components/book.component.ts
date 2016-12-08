import {BookValue, BookService} from "../../shared/services/book.service";
import {BookTableComponent} from "./book-table.component";
import {Component, OnInit} from "@angular/core";
import {LabelService} from "../../shared/services/label.service";
@Component({
    moduleId: module.id,
    selector: 'book',
    templateUrl: 'book.component.html'
})
export class BookComponent implements OnInit {
    private bookValues: Array<BookValue> = [];
    public bookValue: BookValue;

    constructor(public bookService: BookService,
                public bookTable: BookTableComponent
                private labelService: LabelService) {
        this.bookValue = new BookValue();
    }

    ngOnInit() {
        this.bookValues = this.bookService.getBookValues()
            .subscribe(
                bookData => {
                    this.bookValues = bookData;
                    this.bookValues.forEach((bookValue) => {
                        bookValue.balanceTypeDescription = this.labelService.get(bookValue.balanceType);
                    });
                    this.bookTable.data = this.bookValues;
                    this.bookTable.config.filtering.filterString = '';
                    this.bookTable.onChangeTable(this.bookTable.config);
                },
                error => {
                    alert(error);
                    console.log(error);
                },
                () => console.log('Bookvalues retrieved: ' + this.bookValues.length)
            )
    }

    public addBookValue(): void {
        this.bookService.addBookValue(this.bookValue);
        this.bookValues = (<BookValue[]>this.bookValues).concat(this.bookValue);

        this.bookTable.data = this.bookValues;
        this.bookTable.config.filtering.filterString = '';
        this.bookTable.onChangeTable(this.bookTable.config);
    }
}