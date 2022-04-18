import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, QueryList, ViewChildren, Renderer2, ChangeDetectorRef  } from '@angular/core';
import { ServiceSettings } from './shared/settings.service';
import { ServiceFetch } from './shared/fetch.service';
import { Settings } from './shared/settings.model';
import { JsonNode } from './shared/jsonNode.model';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  settings!: Settings;
  commedy_text?: JsonNode;
  paraphrase_text?: JsonNode;
  notes!: JsonNode;
  paraphraseList!: QueryList<ElementRef>;
  scrolltrigger!: Array<ScrollTrigger>;
  @ViewChild('scrollStart', { read: ElementRef }) scrollStart!: ElementRef;
  @ViewChild('paraphrColumn', { read: ElementRef }) paraphrColumn!: ElementRef;
  @ViewChildren('paraphrFragm', { read: ElementRef }) paraphGroup!: QueryList<ElementRef>;

  constructor(private serviceSettings: ServiceSettings, private serviceFetch: ServiceFetch, private cd: ChangeDetectorRef, private renderer: Renderer2) { 
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

  ngOnInit(): void {
    this.settings = this.serviceSettings.getSettings();
    // fetch
    this.serviceFetch.fetchData().subscribe(res => {
      const parser: DOMParser = new DOMParser();
      const formattedXML = this.minifyXml(res);
      const xml: Document = parser.parseFromString(formattedXML, "application/xml");
      const commedyText: NodeListOf<Element> = xml.querySelectorAll('[type=main-text] body');
      const commedyJson: Array<JsonNode> = Array.from(commedyText).map(e => this.serviceFetch.parseNode(e));
      this.commedy_text = commedyJson[0];
      const paraphraseText: NodeListOf<Element> = xml.querySelectorAll('[type=paraphrase] body');
      const paraphraseJson: Array<JsonNode> = Array.from(paraphraseText).map(e => this.serviceFetch.parseNode(e));
      this.paraphrase_text = paraphraseJson[0];
      const notes: NodeListOf<Element> = xml.querySelectorAll('list[type=notes]');
      const notesJson: Array<JsonNode> = Array.from(notes).map(e => this.serviceFetch.parseNode(e));
      this.notes = notesJson[0];
    });
  }

  ngAfterViewInit(): void {
      this.serviceFetch.passParaphrFragm.subscribe(
        (paraphraseList: QueryList<ElementRef>) => {
          this.paraphraseList = paraphraseList;
          this.focusByScroll();
          this.scrolltrigger = ScrollTrigger.getAll();
          this.cd.detectChanges();
        }
      );
  }

  focusByScroll() {
    Array.from(document.querySelectorAll('div.terzina')).forEach(terzina => {
      gsap.to(terzina, {
        scrollTrigger: {
          trigger: terzina,
          start: () => `top ${this.setScrollRef()}`,
          end: () => `bottom ${this.setScrollRef()}`,
          toggleClass: 'focused',
          markers: true,
          // invalidateOnRefresh: true,
          onEnter: () => {
            if (this.setParaphraseFragment(this.paraphraseList, <HTMLElement>terzina)) {
              this.renderer.addClass(this.setParaphraseFragment(this.paraphraseList, <HTMLElement>terzina), 'corresp');
              const elRefDistance = this.cumulativeOffset(<HTMLElement>terzina);
              const parFragDistance = this.cumulativeOffset(this.setParaphraseFragment(this.paraphraseList, <HTMLElement>terzina));
              const totalDistance = elRefDistance - parFragDistance;
              this.renderer.setStyle(this.paraphrColumn.nativeElement, 'transform', `translateY(${String(totalDistance)}px)`);
            }
          },
          onLeave: () => {
            if (this.setParaphraseFragment(this.paraphraseList, <HTMLElement>terzina)) {
              this.renderer.removeClass(this.setParaphraseFragment(this.paraphraseList, <HTMLElement>terzina), 'corresp');
            }
          },
          onEnterBack: () => {
            if (this.setParaphraseFragment(this.paraphraseList, <HTMLElement>terzina)) {
              this.renderer.addClass(this.setParaphraseFragment(this.paraphraseList, <HTMLElement>terzina), 'corresp');
              const elRefDistance = this.cumulativeOffset(<HTMLElement>terzina);
              const parFragDistance = this.cumulativeOffset(this.setParaphraseFragment(this.paraphraseList, <HTMLElement>terzina));
              const totalDistance = elRefDistance - parFragDistance;
              this.renderer.setStyle(this.paraphrColumn.nativeElement, 'transform', `translateY(${String(totalDistance)}px)`);
            }
          },
          onLeaveBack: () => {
            if (this.setParaphraseFragment(this.paraphraseList, <HTMLElement>terzina)) {
              this.renderer.removeClass(this.setParaphraseFragment(this.paraphraseList, <HTMLElement>terzina), 'corresp');
            }
          },
        }
      });
    });
  }
}
































// Oiginal version to indent xml

/*formatXml(xml: string, tab: string = '\t') { // tab = optional indent value, default is tab (\t)
  var formatted = '', indent = '';
  xml.split(/>\s*</).forEach(function (node) {
    if (node.match(/^\/\w/)) indent = indent.substring(tab.length); // decrease indent by one 'tab'
    formatted += indent + '<' + node + '>\r\n';
    if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab;              // increase indent
  });
  return formatted.substring(1, formatted.length - 3).replace(/[\r\n]/g, '');
}*/