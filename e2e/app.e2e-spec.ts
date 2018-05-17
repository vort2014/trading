import { TradingPage } from './app.po';

describe('trading App', () => {
  let page: TradingPage;

  beforeEach(() => {
    page = new TradingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
