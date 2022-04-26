import { Component, ElementRef, OnInit, ViewChild, QueryList, Renderer2 } from '@angular/core';
import { ServiceSettings } from '../shared/settings.service';
import { ServiceFetch } from '../shared/fetch.service';
import { ServiceEvent } from '../shared/event.service';
import { Settings } from '../shared/settings.model';
import { JsonNode } from '../shared/jsonNode.model';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-router-container',
  templateUrl: './router-container.component.html',
  styleUrls: ['./router-container.component.css']
})
export class RouterContainerComponent implements OnInit {
  settings!: Settings;
  comedy_text?: JsonNode;
  paraphrase_text?: JsonNode;
  notes!: JsonNode;
  terzineList!: QueryList<ElementRef>;
  paraphraseList!: QueryList<ElementRef>;
  cantica!: string;
  canto!: string;
  navigation?: { next: string | undefined | null, prev: string | undefined | null } = { next: null, prev: null } ;
  @ViewChild('scrollStart') scrollStart!: ElementRef;
  @ViewChild('paraphrColumn') paraphrColumn!: ElementRef;

  constructor(private paramsRoute: ActivatedRoute, private serviceSettings: ServiceSettings, private serviceFetch: ServiceFetch, private serviceEvt: ServiceEvent, private renderer: Renderer2) {
    gsap.registerPlugin(ScrollTrigger);
  }

  setParaphraseFragment(list: QueryList<ElementRef>, el: HTMLElement) {
    const fragmentsList = list.toArray().map(e => e.nativeElement);
    const elRefId = el.id;
    return fragmentsList.find(e => e.dataset['terzina'] === elRefId);
  }

  setScrollRef(): string {
    const scrollNative = this.scrollStart.nativeElement;
    const startPoint: string = String(this.cumulativeOffset(scrollNative) + scrollNative!.clientHeight + 1);
    return startPoint;
  }

  cumulativeOffset(element: HTMLElement | null) {
    let top = 0;
    do {
      top += element?.offsetTop || 0;
      element = <HTMLElement>element?.offsetParent;
    } while (element);
    return top;
  };

  minifyXml(xml: string) {
    let formatted = '';
    xml.split(/>\s*</).forEach(node => formatted += '<' + node + '>');
    const minified = formatted.substring(1, formatted.length - 3);
    return minified;
  }

  getCanto(arg: any) {
    return arg.replace('#', '');
  }

  getCantica(arg: any){
    const ff = arg.split('-');
    return this.getCanto(ff[0]);
  }

  fetch(){
    this.serviceFetch.fetchData().subscribe(res => {
      const parser: DOMParser = new DOMParser();
      const formattedXML = this.minifyXml(res);
      const xml: Document = parser.parseFromString(formattedXML, "application/xml");
      const commedyText: NodeListOf<Element> = xml.querySelectorAll(`[*|id=${this.cantica}] [*|id=${this.canto}] [type=main-text] body`);
      const commedyJson: Array<JsonNode> = Array.from(commedyText).map(e => this.serviceFetch.parseNode(e));
      this.comedy_text = commedyJson[0];
      const paraphraseText: NodeListOf<Element> = xml.querySelectorAll(`[*|id=${this.cantica}] [*|id=${this.canto}] [type=paraphrase] body`);
      const paraphraseJson: Array<JsonNode> = Array.from(paraphraseText).map(e => this.serviceFetch.parseNode(e));
      this.paraphrase_text = paraphraseJson[0];
      const notes: NodeListOf<Element> = xml.querySelectorAll(`[*|id=${this.cantica}] [*|id=${this.canto}] list[type=notes]`);
      const notesJson: Array<JsonNode> = Array.from(notes).map(e => this.serviceFetch.parseNode(e));
      this.notes = notesJson[0];
      const next: string | null | undefined = xml.querySelector(`[*|id=${this.canto}]`)?.getAttribute('next');
      //console.log(next);
      const prev: string | null | undefined = xml.querySelector(`[*|id=${this.canto}]`)?.getAttribute('prev');
      //console.log(prev);
      this.navigation = { next, prev };
    });
  }

  ngOnInit(): void {
    this.settings = this.serviceSettings.getSettings();
    this.paramsRoute.params
    .subscribe((params: Params) => {
      this.cantica = params['cantica'];
      this.canto = params['canto'];
      this.fetch();
    });
    this.serviceEvt.passTerzine.subscribe(
      (terzineList: QueryList<ElementRef>) => {
        this.terzineList = terzineList;
      }
    );
    this.serviceEvt.passParaphrFragm.subscribe(
      (paraphraseList: QueryList<ElementRef>) => {
        this.paraphraseList = paraphraseList;
        this.focusByScroll();
      }
    );
  }

  enterAction(el: HTMLElement) {
    const paraphrFragment = this.setParaphraseFragment(this.paraphraseList, el);
    if (paraphrFragment) {
      const paraphrArray = this.paraphraseList.toArray().map(e => e.nativeElement);
      paraphrArray.forEach(e => this.renderer.removeClass(e, 'corresp'));
      this.renderer.addClass(paraphrFragment, 'corresp');
      const elRefDistance = this.cumulativeOffset(el);
      const parFragDistance = this.cumulativeOffset(paraphrFragment);
      const totalDistance = elRefDistance - parFragDistance;
      this.renderer.setStyle(this.paraphrColumn.nativeElement, 'transform', `translateY(${String(totalDistance)}px)`);
      console.log(totalDistance);
    }
  }

  focusByScroll() {
    this.terzineList.toArray().map(e => e.nativeElement).forEach(terzina => {
      ScrollTrigger.matchMedia({
        "(min-width: 721px)": () => {
          gsap.to(terzina, {
            scrollTrigger: {
              trigger: terzina,
              start: () => `top ${this['setScrollRef']()}`,
              end: () => `bottom ${this['setScrollRef']()}`,
              toggleClass: 'focused',
              // markers: true,
              onEnter: () => {
                this['enterAction'](<HTMLElement>terzina);
              },
              onEnterBack: () => {
                this['enterAction'](<HTMLElement>terzina);
              },
            }
          });
        },
      });
    });
  }
}