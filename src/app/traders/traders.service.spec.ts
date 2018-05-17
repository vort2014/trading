import { TestBed, inject } from '@angular/core/testing';

import { TradersService } from './traders.service';

describe('TradersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradersService]
    });
  });

  // it('should be created', inject([TradersService], (service: TradersService) => {
  //   expect(service).toBeTruthy();
  // }));
});

describe('TradersService Isolated Tests', () =>
{
  let tradersService: TradersService;

  beforeEach(() =>
  {
    tradersService = new TradersService();
  });

  it('TradersService created', () =>
  {
    expect(tradersService).toBeDefined();
  });

  it('Default traders created', () =>
  {
      expect(tradersService.getTraders).toBeDefined();
  });

  it('Default traders contains Oleg', () =>
  {
    expect(tradersService.getTraders()[0].getName()).toEqual('Oleg');
  });

  it('Default traders contains Anna', () =>
  {
    expect(tradersService.getTraders()[1].getName()).toEqual('Anna');
  });

  it('New trader should be added', () =>
  {
    let expectedName: string = 'Ivan';
    tradersService.add(expectedName);

    expect(tradersService.getTraders()[2].getName()).toEqual(expectedName);
  });

  it('New trader should be added', () =>
  {
    let expectedName = 'Oleg';

    tradersService.getTrader(expectedName)
      .then(trader =>
      {
        expect(trader.getName()).toEqual(expectedName);
      })
      .catch(err => fail(err));
  });

  it('New trader should be added', function(done)
  {
    let expectedName = 'Oleg';

    tradersService.getTrader(expectedName)
      .then(trader =>
      {
        expect(trader.getName()).toEqual(expectedName);
        done();
      })
      .catch(err => fail(err));

  }, 1000);

});
