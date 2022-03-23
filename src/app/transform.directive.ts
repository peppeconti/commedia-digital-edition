import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTransform]'
})
export class TransformDirective implements OnInit {
  @Input() rule: any;

  constructor() { }

  ngOnInit() {
    console.log(this.rule);
  }

}