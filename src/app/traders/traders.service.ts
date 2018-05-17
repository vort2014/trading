import {Injectable} from '@angular/core';
import {Trader} from "../domain/Trader";

@Injectable()
export class TradersService {

  private traders: Trader[];

  constructor()
  {
    this.traders = [];
    this.createMockTraders();
  }

  private createMockTraders()
  {
    let t: Trader = new Trader('Oleg');

    this.traders.push(t);

    t = new Trader('Anna');
    this.traders.push(t);
  }


  add(name: string)
  {
    this.traders.push(new Trader(name));
  }

  getTraders(): Trader[]
  {
    return this.traders;
  }

  getTrader(name: string): Promise<Trader>
  {
    return new Promise(resolve =>
    {
        setTimeout(() => resolve(Promise.resolve(this.traders.find(t => name === t.getName()))), 0);
    });
  }
}
