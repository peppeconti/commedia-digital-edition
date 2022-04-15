import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

@Directive({
  selector: '[appAlign]'
})
export class AlignDirective implements OnInit {
  @Input() scrollRef!: ElementRef;
  startPoint!: string;

  constructor(private elRef: ElementRef) {
  }

  getScrollRef(): string {
    const scrollNative = this.scrollRef.nativeElement;
    const startPoint: string = String(scrollNative!.getBoundingClientRect().top + scrollNative!.clientHeight);
    return startPoint;
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.startPoint = this.getScrollRef();
    this.focusByScroll();
  }

  focusByScroll() {
    gsap.to(this.elRef.nativeElement, {
      scrollTrigger: {
        trigger: this.elRef.nativeElement,
        start: `top ${this.startPoint}`,
        end: `bottom ${this.startPoint}`,
        toggleClass: 'focused',
        markers: true,
        onEnter: () => {
          const matchTerzina = document.querySelector(`[data-terzina=${this.elRef.nativeElement.attributes.id.value}]`);
          //console.log(matchTerzina);
          matchTerzina?.classList.add('corresp');
          console.log(this.elRef.nativeElement.getBoundingClientRect().top);
          console.log(matchTerzina!.getBoundingClientRect().top);
          let aa = this.elRef.nativeElement.getBoundingClientRect().top;
          let bb = matchTerzina!.getBoundingClientRect().top;
          if (bb !== 0) {
            let cc = aa - bb;
            (<HTMLElement>matchTerzina!).style.transform = `translateY(${cc}px)`;
          }
        },
        onLeave: () => {
          const matchTerzina = document.querySelector(`[data-terzina=${this.elRef.nativeElement.attributes.id.value}]`);
          //console.log(matchTerzina);
          matchTerzina?.classList.remove('corresp');
        },
        onEnterBack: () => {
          const matchTerzina = document.querySelector(`[data-terzina=${this.elRef.nativeElement.attributes.id.value}]`);
          //console.log(matchTerzina);
          matchTerzina?.classList.add('corresp');
        },
        onLeaveBack: () => {
          const matchTerzina = document.querySelector(`[data-terzina=${this.elRef.nativeElement.attributes.id.value}]`);
          //console.log(matchTerzina);
          matchTerzina?.classList.remove('corresp');
        },

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