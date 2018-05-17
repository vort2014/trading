import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TraderDetailsComponent} from './trader-details.component';
import {TradersService} from "../traders/traders.service";
import {MarketServiceImpl} from "../market/market.service";
import {MarketServiceSpy} from "../testing/market.service.spy.spec";
import {ActivatedRoute} from "@angular/router";
import {Location, LocationStrategy} from "@angular/common";
import {StocksComponent} from "./stocks/stocks.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdAutocompleteModule, MdInputModule, MdOptionModule} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {LocationStrategySpy} from "../testing/location.strategy.spy.spec";
import {Stock} from "../domain/Stock";
import {DebugElement} from "@angular/core";
import {ActivatedRouteStub} from "../testing/router-stubs.spec";

describe('TraderDetailsComponent', () =>
{

  let expectedTraderName = 'Oleg';
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  let component: TraderDetailsComponent;
  let fixture: ComponentFixture<TraderDetailsComponent>;

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MdInputModule,
        MdAutocompleteModule,
        MdOptionModule,
        ReactiveFormsModule
      ],
      declarations: [TraderDetailsComponent, StocksComponent],
      providers: [
        TradersService,
        {provide: MarketServiceImpl, useClass: MarketServiceSpy},
        {provide: ActivatedRoute, useValue: activatedRoute},
        Location,
        {provide: LocationStrategy, useClass: LocationStrategySpy},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(TraderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    activatedRoute.testParamMap = {name: expectedTraderName};
  });

  it('should be created', () =>
  {
    expect(component).toBeTruthy();
  });

  it('trader should be set', function (done)
  {
    // activatedRoute.testParamMap = { name: expectedTraderName };

    setTimeout(() =>
    {
      expect(component.trader.getName()).toEqual(expectedTraderName);
      done();

    }, 100)

  }, 200);

  it('stock should be added to portfolio', function (done)
  {
    let expectedStockSymbol = 'XXX';

    setTimeout(() =>
    {
      component.selectedStock = new Stock(expectedStockSymbol, '', new MarketServiceSpy());
      component.countInput.setValue(10);

      let buyStockBtn: DebugElement = fixture.debugElement.query((de: DebugElement) => de.attributes['id'] === 'buyStockBtn');
      buyStockBtn.nativeElement.click();

      let actualTrade = component.trader.getPortfolio().find(trade => expectedStockSymbol === trade.getStock().getSymbol());

      expect(actualTrade.getStock().getSymbol()).toEqual(expectedStockSymbol);

      done();

    }, 100)

  }, 200);

});
