import { Directive, ElementRef, OnInit, Input, QueryList } from '@angular/core';
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
  startPoint!: string;
  paraphraseDistance: number = 0;

  constructor(private elRef: ElementRef, private serviceFetch: ServiceFetch) {
  }

  setParaphraseFragment(list: QueryList<ElementRef>) {
    const fragmentsList = list.toArray().map(e => e.nativeElement);
    const elRefId = this.elRef.nativeElement.attributes.id.value;
    this.paraphraseFragment = fragmentsList.find(e => e.dataset['terzina'] === elRefId);
  }

  setScrollRef(): string {
    const scrollNative = this.scrollRef.nativeElement;
    const startPoint: string = String(scrollNative!.getBoundingClientRect().top + scrollNative!.clientHeight);
    return startPoint;
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.startPoint = this.setScrollRef();
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
        start: `top ${this.startPoint}`,
        end: `bottom ${this.startPoint}`,
        toggleClass: 'focused',
        markers: true,
        onEnter: () => {
          this.paraphraseFragment ? this.paraphraseFragment.classList.add('corresp') : console.log('no match found');
          console.log(this.paraphrColumnRef);
          const elRefDistance = this.cumulativeOffset(this.elRef.nativeElement);
          const parFragDistance = this.cumulativeOffset(this.paraphraseFragment);
          const totalDistance = elRefDistance - parFragDistance;
          (<HTMLElement>this.paraphrColumnRef.nativeElement).style.transform = `translateY(${String(totalDistance)}px)`;
        },
        onLeave: () => {
          this.paraphraseFragment ? this.paraphraseFragment.classList.remove('corresp') : console.log('no match found');
        },
        onEnterBack: () => {
          this.paraphraseFragment ? this.paraphraseFragment.classList.add('corresp') : console.log('no match found');
          const elRefDistance = this.cumulativeOffset(this.elRef.nativeElement);
          const parFragDistance = this.cumulativeOffset(this.paraphraseFragment);
          const totalDistance = elRefDistance - parFragDistance;
          (<HTMLElement>this.paraphrColumnRef.nativeElement).style.transform = `translateY(${String(totalDistance)}px)`;

        },
        onLeaveBack: () => {
          this.paraphraseFragment ? this.paraphraseFragment.classList.remove('corresp') : console.log('no match found');
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