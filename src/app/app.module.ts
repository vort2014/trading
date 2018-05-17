import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MarketComponent } from './market/market.component';
import {MarketServiceImpl} from "./market/market.service";
import { TradersComponent } from './traders/traders.component';
import { TraderDetailsComponent } from './trader-details/trader-details.component';
import {TradersService} from "./traders/traders.service";
import {RoutingModule} from "./routing/routing.module";
import { StocksComponent } from './trader-details/stocks/stocks.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MdAutocompleteModule, MdInputModule, MdOptionModule } from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    TradersComponent,
    TraderDetailsComponent,
    StocksComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdAutocompleteModule,
    MdOptionModule,
    ReactiveFormsModule
  ],
  providers: [MarketServiceImpl, TradersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
