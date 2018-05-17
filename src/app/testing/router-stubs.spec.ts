


import {Component, Directive, Injectable, Input} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {convertToParamMap, NavigationExtras, Params} from "@angular/router";

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective
{
  @Input('routerLink')
  linkParams: any;

  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}


@Injectable()
export class ActivatedRouteStub
{
  private subject = new Subject();
  paramMap = this.subject.asObservable();

  private _testParamMap: Params;

  get testParamMap()
  {
    return this._testParamMap;
  }

  set testParamMap(params: Params)
  {
    this._testParamMap = params;
    this.subject.next(convertToParamMap(this._testParamMap));
  }

  get snapshot()
  {
    return { paramMap: this.testParamMap };
  }
}

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }

@Injectable()
export class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras) { }
}
