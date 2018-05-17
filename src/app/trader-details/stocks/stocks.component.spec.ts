import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StocksComponent} from './stocks.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdAutocompleteModule, MdInputModule, MdOptionModule} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {MarketServiceImpl} from "../../market/market.service";
import {DebugElement} from "@angular/core";
import {MarketServiceSpy} from "../../testing/market.service.spy.spec";
import {Stock} from "../../domain/Stock";

describe('StocksComponent', () =>
{
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

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
      declarations: [StocksComponent],
      providers: [MarketServiceImpl]
    })
      .overrideComponent(StocksComponent,
        {
          set:
            {
              providers: [{provide: MarketServiceImpl, useClass: MarketServiceSpy}]
            }
        })
      .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should contain stockInput', () =>
  {
    let de: DebugElement = fixture.debugElement.query((de: DebugElement) => de.attributes['id'] === 'stockInput');
    expect(de).not.toBeNull();
  });

  it('filter should work', () =>
  {
    let filter = 'M';

    let stockInput: DebugElement = fixture.debugElement.query((de: DebugElement) => de.attributes['id'] === 'stockInput');
    stockInput.nativeElement.value = filter;

    fixture.detectChanges();

    let mmm = null;

    component.filteredStocks
      .subscribe(stocks => mmm = stocks.find(stock => stock.getSymbol() === 'MMM'));

    expect(mmm).not.toBeNull();

  });


  it('selected stock should be updated', () =>
  {
    let filter = 'MMM';

    component.stockInput.setValue(filter, {emitEvent: true, emitModelToViewChange: true, emitViewToModelChange: true});

    expect(component.selected.getSymbol()).toEqual(filter);
  });

  it('stock updated event should be emitted', function(done)
  {
    let filter = 'MMM';
    let selectedStock: Stock;

    component.onStockSelect.subscribe((stock: Stock) => selectedStock = stock);

    component.stockInput.setValue(filter, {emitEvent: true, emitModelToViewChange: true, emitViewToModelChange: true});

    setTimeout(() => {expect(selectedStock.getSymbol()).toEqual(filter); done()}, 100)

  }, 200);

});
