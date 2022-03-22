import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomNode } from './main-text/customNode.model';
import { parseNode } from 'src/functions/parseNode';
import transform_rules from '../assets/trasform-rules';
// import data from '../assets/config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  terzine?: CustomNode;
  paraphrase?: CustomNode;
  paraphraseActive = false;
  showNote = true;
  rules = transform_rules;

  paraphraseHandler(event: boolean) {
    this.paraphraseActive = event;
  }

  constructor(private http: HttpClient) {

    this.http.get('assets/data/divina_commedia.xml', {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/xml')
        .append('Access-Control-Allow-Methods', 'GET')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
      responseType: 'text'
    })
      .subscribe(res => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(res, "application/xml");
        const lineGroups = xml.querySelectorAll('[type=main-text] body');
        const mainJson = Array.from(lineGroups).map(e => parseNode(e));
        const paraphrase = xml.querySelectorAll('[type=paraphrase] body');
        const paraphraseJson = Array.from(paraphrase).map(e => parseNode(e));
        this.terzine = mainJson[0];
        this.paraphrase = paraphraseJson[0];
        // console.log(terzineJS);
      })
  }
}