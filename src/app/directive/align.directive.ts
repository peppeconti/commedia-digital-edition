import { Directive, ElementRef, OnInit, Input, QueryList, Renderer2, HostListener } from '@angular/core';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { ServiceFetch } from '../shared/fetch.service';

@Directive({
  selector: '[appAlign]'
})
export class AlignDirective implements OnInit {
  @Input() scrollRef!: ElementRef;
  @Input() paraphrColumnRef!: ElementRef;
  paraphraseFragment!: HTMLElement;
  // tl = gsap.timeline;

  /*@HostListener('window:resize', ['$event']) onResize() {
    //ScrollTrigger.getAll().forEach(e => console.log(e.vars));
    ScrollTrigger.refresh();
    /*setTimeout(() => {
      ScrollTrigger.getAll().forEach(e => {
        e.vars.start = `top ${this.setScrollRef()}`;
        e.vars.end = `bottom ${this.setScrollRef()}`;
      });
    }, 1000)
  }*/

  constructor(private elRef: ElementRef, private serviceFetch: ServiceFetch, private renderer: Renderer2) {
  }

  setParaphraseFragment(list: QueryList<ElementRef>) {
    const fragmentsList = list.toArray().map(e => e.nativeElement);
    const elRefId = this.elRef.nativeElement.attributes.id.value;
    this.paraphraseFragment = fragmentsList.find(e => e.dataset['terzina'] === elRefId);
  }

  setScrollRef(): string {
    const scrollNative = this.scrollRef.nativeElement;
    const startPoint: string = String(this.cumulativeOffset(scrollNative) + scrollNative!.clientHeight + 1);
    return startPoint;
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.serviceFetch.passParaphrFragm.subscribe(
      (paraphraseList: QueryList<ElementRef>) => {
        this.setParaphraseFragment(paraphraseList);
        this.focusByScroll();
      }
    );
  }

  cumulativeOffset(element: HTMLElement | null) {
    let top = 0;
    do {
      top += element?.offsetTop || 0;
      element = <HTMLElement>element?.offsetParent;
    } while (element);
    return top;
  };

  focusByScroll() {
    gsap.to(this.elRef.nativeElement, {
      scrollTrigger: {
        trigger: this.elRef.nativeElement,
        start: () => `top ${this.setScrollRef()}`,
        end: () => `bottom ${this.setScrollRef()}`,
        toggleClass: 'focused',
        // markers: true,
        // invalidateOnRefresh: true,
        onEnter: () => {
          if (this.paraphraseFragment) {
            this.renderer.addClass(this.paraphraseFragment, 'corresp');
            const elRefDistance = this.cumulativeOffset(this.elRef.nativeElement);
            const parFragDistance = this.cumulativeOffset(this.paraphraseFragment);
            const totalDistance = elRefDistance - parFragDistance;
            this.renderer.setStyle(this.paraphrColumnRef.nativeElement, 'transform', `translateY(${String(totalDistance)}px)`);
            //console.log(this.paraphrColumnRef.nativeElement.style.transform);
          }
        },
        onLeave: () => {
          if (this.paraphraseFragment) {
            this.renderer.removeClass(this.paraphraseFragment, 'corresp');
          }
        },
        onEnterBack: () => {
          if (this.paraphraseFragment) {
            this.renderer.addClass(this.paraphraseFragment, 'corresp');
            const elRefDistance = this.cumulativeOffset(this.elRef.nativeElement);
            const parFragDistance = this.cumulativeOffset(this.paraphraseFragment);
            const totalDistance = elRefDistance - parFragDistance;
            this.renderer.setStyle(this.paraphrColumnRef.nativeElement, 'transform', `translateY(${String(totalDistance)}px)`);
            //console.log(this.paraphrColumnRef.nativeElement.style.transform);
          }
        },
        onLeaveBack: () => {
          if (this.paraphraseFragment) {
            this.renderer.removeClass(this.paraphraseFragment, 'corresp');
          }
        },

      }
    });
  }
}

 // matchTerzina?.classList.add('corresp');
/*console.log(this.elRef.nativeElement.getBoundingClientRect().top);
console.log(matchTerzina!.getBoundingClientRect().top);
let aa = this.elRef.nativeElement.getBoundingClientRect().top;
let bb = matchTerzina!.getBoundingClientRect().top;
if (bb !== 0) {
 let cc = aa - bb;
 (<HTMLElement>matchTerzina!).style.transform = `translateY(${cc}px)`;
}*/

/***********************/

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