import { Directive, ElementRef, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appAlign]'
})
export class AlignDirective implements OnInit {

  constructor(private elRef: ElementRef) {
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.scrollFunc();
  }

  scrollFunc() {
    gsap.to(this.elRef.nativeElement, {
      scrollTrigger: {
        trigger: this.elRef.nativeElement,
        start: 'top 33%',
        end: 'bottom 36%',
        toggleClass: 'focused',
        markers: true
      }
    });
  }
}


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