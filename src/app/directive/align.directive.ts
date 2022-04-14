import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

@Directive({
  selector: '[appAlign]'
})
export class AlignDirective implements OnInit {
 
  constructor(private elRef: ElementRef) {
  }

  getScrollRef(): string {
    const scrollRef = document.getElementById('scrollRef');
    const distance: string = String(scrollRef!.getBoundingClientRect().top + scrollRef!.clientHeight + 2);
    return distance;
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.focusByScroll();
  }

  focusByScroll() {
    gsap.to(this.elRef.nativeElement, {
      scrollTrigger: {
        trigger: this.elRef.nativeElement,
        start: `top ${this.getScrollRef()}`,
        end: `bottom ${this.getScrollRef()}`,
        toggleClass: 'focused'
      }
    });
  }
}


/*cumulativeOffset(element: HTMLElement | null) {
  let top = 0;
  do {
      top += element?.offsetTop || 0;
      element = <HTMLElement>element?.offsetParent;
  } while (element);
  return top;
};


/*enableScrollTrigger() {

  const ciao = gsap.timeline().to(this.elRef.nativeElement, 5, { x: 100 });

  ScrollTrigger.create(
    {
      animation: ciao,
      trigger: this.elRef.nativeElement,
      start: 'top center',
      markers: true
    },
  )
}*/