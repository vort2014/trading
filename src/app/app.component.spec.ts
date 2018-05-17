import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {RouterLinkStubDirective, RouterOutletStubComponent} from "./testing/router-stubs.spec";
import {By} from "@angular/platform-browser";

describe('AppComponent', () =>
{
  let fixture;
  let linkDes;
  let links;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutletStubComponent,
        RouterLinkStubDirective
      ],
    }).compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('should create the app', async(() =>
  {
    expect(fixture.componentInstance).toBeTruthy();
  }));

  it('can get RouterLinks from template', () =>
  {
    expect(links.length).toBe(2, 'should have 2 links');
  });

  it('1st link should go to Market', () =>
  {
    expect(links[0].linkParams).toBe('/market');
  });

  it('navigate to should be null by default', () =>
  {
    expect(links[0].navigatedTo).toBeNull('link should not have navigated yet');
  });

  it('can click Market link in template', () =>
  {
    const marketLinkDe = linkDes[0];
    const marketLink = links[0];

    marketLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(marketLink.navigatedTo).toBe('/market');
  });

});
