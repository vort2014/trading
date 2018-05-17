import {Component, OnInit, ViewChild} from '@angular/core';
import {Trader} from "../domain/Trader";
import {Stock} from "../domain/Stock";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Location} from "@angular/common";
import {TradersService} from "../traders/traders.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Trade} from "../domain/Trade";
import {FormControl} from "@angular/forms";
import {StocksComponent} from "./stocks/stocks.component";
import {MarketServiceImpl} from "../market/market.service";

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {

  trader: Trader;

  selectedStock: Stock;

  countInput = new FormControl();

  @ViewChild(StocksComponent)
  private stocksComponent: StocksComponent;

  constructor(private tradersService: TradersService, private marketService: MarketServiceImpl, private route: ActivatedRoute, private location: Location)
  {
    this.trader = new Trader('');
    this.countInput.setValue(10);
  }

  ngOnInit(): void
  {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.tradersService.getTrader(params.get('name')))
      .subscribe((trader: Trader) => this.trader = trader);
  }

  onStockSelect(stock: Stock)
  {
    this.selectedStock = stock;
  }

  closeTrade(trade: Trade)
  {
    this.marketService.sellStock(trade);
  }

  buyStock()
  {
    if (this.selectedStock == null)
    {
      window.alert('Please select the stock');
      return;
    }

    let trade: Trade = this.marketService.buyStock(this.selectedStock.getSymbol(), this.countInput.value);
    this.trader.addToPortfolio(trade);

    this.stocksComponent.clean();
    this.selectedStock = null;
  }

  goBack(): void
  {
    this.location.back();
  }

}
