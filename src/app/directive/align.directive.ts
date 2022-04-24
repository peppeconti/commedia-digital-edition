import { Directive, Input, OnChanges } from '@angular/core';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appAlign]'
})
export class AlignDirective implements OnChanges {
  @Input() scrolltrigger!: Array<ScrollTrigger>;
  @Input() paraphraseActive!: boolean;

  constructor() {
  }

  ngOnChanges(): void {
    if (this.scrolltrigger) {
      this.paraphraseActive ? this.scrolltrigger.forEach(e => e.enable()) : this.scrolltrigger.forEach(e => e.disable());
    }
  }
}