import { Directive, ContentChildren, QueryList, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appQuerySelf]'
})
export class QuerySelfDirective implements AfterViewInit {
  @ContentChildren('paraph') paraphGroup!: QueryList<Element>;

  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.paraphGroup)
  }
}
