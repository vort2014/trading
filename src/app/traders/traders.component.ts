import { Component, OnInit } from '@angular/core';
import {Trader} from "../domain/Trader";
import {TradersService} from "./traders.service";

@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.css']
})
export class TradersComponent implements OnInit {

  traders: Trader[];

  constructor(private tradersService: TradersService) { }

  ngOnInit()
  {
    this.updateTraders();
  }

  private updateTraders()
  {
    this.traders = this.tradersService.getTraders();
  }

  add(name: string)
  {
    this.tradersService.add(name);
    this.updateTraders();
  }

}
