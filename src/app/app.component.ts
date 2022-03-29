import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JsonNode } from './jsonNode.model';
import { RulesServices } from './rules.service';
import { ThirdServices } from './third.service';
import { parseNode } from '../functions/parseNode';
import { Rule } from './rule.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  rules: Array<Rule> = this.rulesservice.rules;
  main_text?: JsonNode;
  paraphrase?: JsonNode;
  settings: {showNote: boolean, showParaphrase: boolean} = this.rulesservice.settings;

  constructor(private rulesservice: RulesServices, private third: ThirdServices) { }

  ngOnInit() {
    this.rulesservice.fetchData().subscribe(res => {
      const parser: DOMParser = new DOMParser();
      const xml: Document = parser.parseFromString(res, "application/xml");
      const mainText: NodeListOf<Element> = xml.querySelectorAll('[type=main-text] body');
      const paraphrase: NodeListOf<Element> = xml.querySelectorAll('[type=paraphrase] body');
      console.log(paraphrase);
      const mainJson: Array<JsonNode> = Array.from(mainText).map(e => parseNode(e));
      this.main_text = mainJson[0];
      const paraphraseJson: Array<JsonNode> = Array.from(paraphrase).map(e => parseNode(e));
      //console.log(paraphraseJson);
      this.paraphrase = paraphraseJson[0];
      //console.log(this.paraphrase);
    });
  }
  hideNote(){
    this.rulesservice.settings.showNote = false;
  }
}