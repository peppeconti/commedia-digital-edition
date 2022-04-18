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
    if (this.paraphraseActive && this.scrolltrigger) {
      this.scrolltrigger.forEach(e => e.enable())
    } else if (!this.paraphraseActive && this.scrolltrigger) {
      this.scrolltrigger.forEach(e => e.disable())
    }
  }
}