import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, QueryList, ViewChildren, ContentChildren, ChangeDetectorRef } from '@angular/core';
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
  @ViewChild('scrollStart', { read: ElementRef }) scrollStart!: ElementRef;
  @ViewChild('paraphrColumn', { read: ElementRef }) paraphrColumn!: ElementRef;
  @ViewChildren('paraphrFragm', { read: ElementRef }) paraphGroup!: QueryList<ElementRef>;

  constructor(private serviceSettings: ServiceSettings, private serviceFetch: ServiceFetch, /*private cd: ChangeDetectorRef*/) { 
    gsap.registerPlugin(ScrollTrigger);
  }

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
    this.serviceFetch.passParaphrFragm.subscribe(
      (paraphraseList: QueryList<ElementRef>) => {
        this.paraphraseList = paraphraseList;
      }
    );
  }

  ngAfterViewInit(): void {
      // this.cd.detectChanges();
      
      console.log(this.paraphrColumn);
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