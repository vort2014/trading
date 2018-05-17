import {Injectable} from '@angular/core';
import {Stock} from "../domain/Stock";
import {Trade} from "../domain/Trade";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MarketServiceImpl implements MarketService
{

  private stocks: Stock[];
  private counter: number;

  constructor(private httpClient: HttpClient)
  {
    this.stocks = [];
    this.counter = 0;

    // this.setUpDJIStocks();
    this.setUpDJIStocks2().subscribe(
      data =>
      {
        for (let md of data)
        {
          this.stocks.push(new Stock(md.symbol, md.company, this));
        }
      },
      error =>
      {
        console.log('Cannot get market data from the server!!!');
      }
    );
  }

  getPrice(symbol: string): number
  {
    return Math.random() * 1000 * symbol.length;
  }

  getUpdatedPrice(currentPrice: number): number
  {
    let multiplier = 1;
    this.counter++;

    if (this.counter % 2 == 0)
    {
      multiplier = -1;
    }

    return Math.round((currentPrice + (Math.random() * multiplier)) * 100 + Number.EPSILON) / 100;
  }

  addStock(symbol: string, company: string)
  {
    this.stocks.push(new Stock(symbol, company, this));
  }

  getStocks(): Stock[]
  {
    return this.stocks;
  }

  buyStock(symbol: string, count: number): Trade
  {
    let stock: Stock = this.getStock(symbol);

    return new Trade(stock, count, stock.getPrice());
  }

  sellStock(trade: Trade): void
  {
    let stock: Stock = trade.getStock();
    trade.close(stock.getPrice());
  }

  private getStock(symbol: string): Stock
  {
    for (let currentStock of this.stocks)
    {
      if (currentStock.getSymbol() == symbol)
      {
        return currentStock;
      }
    }

    throw new Error(`symbol ${symbol} not found`);
  }

  private setUpDJIStocks2(): Observable<MarketData[]>
  {
    return this.httpClient.get<MarketData[]>('assets/market-data.json');
    // .retry(2)
    // .map(result => result.json() as MarketData[]);
    // .toPromise()
    // .then(result => console.log(result))
    // .catch(err => console.log(err));
  }

  // TODO should be used at first
  private setUpDJIStocks(): void
  {
    this.stocks.push(new Stock('MMM', '3M', this));
    this.stocks.push(new Stock('AXP', 'American Express', this));
    this.stocks.push(new Stock('AAPL', 'Apple', this));
    this.stocks.push(new Stock('BA', 'Boeing', this));
    this.stocks.push(new Stock('CAT', 'Caterpillar', this));
    this.stocks.push(new Stock('CVX', 'Chevron', this));
    this.stocks.push(new Stock('CSCO', 'Cisco', this));
    this.stocks.push(new Stock('KO', 'Coca-Cola', this));
    this.stocks.push(new Stock('DIS', 'Disney', this));
    this.stocks.push(new Stock('DD', 'E I du Pont de Nemours and Co', this));
    this.stocks.push(new Stock('XOM', 'Exxon Mobil', this));
    this.stocks.push(new Stock('GE', 'General Electric', this));
    this.stocks.push(new Stock('GS', 'Goldman Sachs', this));
    this.stocks.push(new Stock('HD', 'Home Depot', this));
    this.stocks.push(new Stock('IBM', 'IBM', this));
    this.stocks.push(new Stock('INTC', 'Intel', this));
    this.stocks.push(new Stock('JNJ', 'Johnson & Johnson', this));
    this.stocks.push(new Stock('JPM', 'JPMorgan Chase', this));
    this.stocks.push(new Stock('MCD', "McDonald's", this));
    this.stocks.push(new Stock('MRK', 'Merck', this));
    this.stocks.push(new Stock('MSFT', 'Microsoft', this));
    this.stocks.push(new Stock('NKE', 'Nike', this));
    this.stocks.push(new Stock('PFE', 'Pfizer', this));
    this.stocks.push(new Stock('PG', 'Procter & Gamble', this));
    this.stocks.push(new Stock('TRV', 'Travelers Companies Inc', this));
    this.stocks.push(new Stock('UTX', 'United Technologies', this));
    this.stocks.push(new Stock('UNH', 'UnitedHealth', this));
    this.stocks.push(new Stock('VZ', 'Verizon', this));
    this.stocks.push(new Stock('V', 'Visa', this));
    this.stocks.push(new Stock('WMT', 'Wal-Mart', this));
  }
}

interface MarketData
{
  symbol: string,
  company: string
}

export interface MarketService
{
  getPrice(symbol: string): number;
  getUpdatedPrice(currentPrice: number): number;
  getStocks(): Stock[];
  addStock(symbol: string, company: string);
}
