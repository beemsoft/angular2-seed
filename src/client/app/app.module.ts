import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import {VatModule} from "./vat/components/vat.module";
import {CostModule} from "./cost/components/cost.module";
import {BookModule} from "./book/components/book.module";
import {ActivumModule} from "./activum/components/activum.module";
import {CostMatchModule} from "./match/components/match.module";
import {RegisterModule} from "./register/components/register.module";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AboutModule,
    HomeModule,
    VatModule,
    CostModule,
    CostMatchModule,
    BookModule,
    ActivumModule,
    RegisterModule,
    SharedModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule { }
