import { Directive, Input, OnDestroy, OnInit, QueryList } from '@angular/core';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appAlign]'
})
export class AlignDirective implements OnInit, OnDestroy {
  @Input() scrolltrigger!: Array<ScrollTrigger>;
  // @Input() paraphraseActive!: boolean;

  constructor() {
  }

  ngOnChanges(): void {
    if (this.scrolltrigger) {
      this.scrolltrigger.forEach(e => e.enable())
      console.log(this.scrolltrigger);
    }
  }

  ngOnInit(): void {
   console.log(this.scrolltrigger)
  }

  ngOnDestroy(): void {
    
  }
}