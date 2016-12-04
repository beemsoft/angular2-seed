import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';
import { NameListService } from './name-list/index';
import {CostMatchService} from "./services/cost-match.service";
import {LabelService} from "./services/label.service";
import {ImportListService} from "./services/import-list.service";
import {CsvParseService} from "./services/csv-parse.service";
import {CostTypeSelector, KeysPipe} from "./selectors/cost-type.selector";
import {CostCharacterSelector} from "./selectors/cost-character.selector";
import {VatTypeSelector} from "./selectors/vat-type.selector";
import {BookTypeSelector} from "./selectors/book-type.selector";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    CostTypeSelector,
    VatTypeSelector,
    CostCharacterSelector,
    BookTypeSelector,
    KeysPipe
  ],
  exports: [
    ToolbarComponent,
    NavbarComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    CostTypeSelector,
    CostCharacterSelector,
    VatTypeSelector,
    BookTypeSelector
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService, CostMatchService, LabelService, ImportListService, CsvParseService]
    };
  }
}
