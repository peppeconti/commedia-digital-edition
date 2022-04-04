import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JsonNode } from './shared/jsonNode.model';
import { RulesServices } from './shared/rules.service';
import { parseNode } from '../functions/parseNode';
import { Rule } from './shared/rule.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  rules!: Array<Rule>;
  main_text?: JsonNode;
  paraphrase?: JsonNode;
  settings: { showNote: boolean, showParaphrase: boolean } = this.rulesservice.general_settings;

  constructor(private rulesservice: RulesServices) { }

  ngOnInit() {
    this.rules = this.rulesservice.getRules();
    this.rulesservice.fetchData().subscribe(res => {
      const parser: DOMParser = new DOMParser();
      const xml: Document = parser.parseFromString(res, "application/xml");
      const mainText: NodeListOf<Element> = xml.querySelectorAll('[type=main-text] body');
      const paraphrase: NodeListOf<Element> = xml.querySelectorAll('[type=paraphrase] body');
      // console.log(paraphrase);
      const mainJson: Array<JsonNode> = Array.from(mainText).map(e => parseNode(e));
      this.main_text = mainJson[0];
      const paraphraseJson: Array<JsonNode> = Array.from(paraphrase).map(e => parseNode(e));
      console.log(mainText);
      console.log(mainJson);
      this.paraphrase = paraphraseJson[0];
      //console.log(this.paraphrase);
    });
  }
  hideNote(){
    this.rulesservice.general_settings.showNote = false;
  }
}