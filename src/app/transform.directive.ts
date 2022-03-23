import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTransform]'
})
export class TransformDirective implements OnInit {
  @Input() rule: any;

  constructor() { }

  ngOnInit() {
    if (this.rule) {
      console.log(this.rule);
    }
  }

}
