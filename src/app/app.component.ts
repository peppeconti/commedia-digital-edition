import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JsonNode } from './main-text/jsonNode.model';
import { RulesServices } from './rules.service';
import { parseNode } from '../functions/parseNode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RulesServices],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  main_text?: JsonNode;
  settings: {showNote: boolean, showParaphrase: boolean} = this.rulesservice.settings;

  constructor(private rulesservice: RulesServices) { }

  ngOnInit() {
    this.rulesservice.fetchData().subscribe(res => {
      const parser: DOMParser = new DOMParser();
      const xml: Document = parser.parseFromString(res, "application/xml");
      const lineGroups: NodeListOf<Element> = xml.querySelectorAll('[type=main-text] body');
      // console.log(lineGroups);
      const mainJson: Array<JsonNode> = Array.from(lineGroups).map(e => parseNode(e));
      this.main_text = mainJson[0];
    });
  }
  hideNote(){
    this.rulesservice.settings.showNote = false;
  }
}
