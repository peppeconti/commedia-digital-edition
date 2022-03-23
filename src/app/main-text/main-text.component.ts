import { Component, OnInit, Input } from '@angular/core';
import { faAmericanSignLanguageInterpreting } from '@fortawesome/free-solid-svg-icons';
import { JsonNode } from './jsonNode.model';

@Component({
  selector: 'app-main-text',
  templateUrl: './main-text.component.html',
  styleUrls: ['./main-text.component.css']
})
export class MainTextComponent implements OnInit {
  @Input() main_text: JsonNode | undefined;
  @Input() rules: any;
  @Input() rule: any;

  constructor() {

  }

  /*compare(arg_1: any, arg_2: any) {
    return arg_1.map((a: any) => {
      return arg_2.some((b: any) => {
        return a.name === b.name && a.value === b.value
      })
    });
  }*/

  findRule(data: any) {
    return this.rules.find((e: any) => {
      (data?.tagName === e.element)
    });
  }

  ngOnInit(): void {
    console.log(this.rules);
    console.log(this.main_text)
    console.log(this.findRule(this.main_text));
  }
}
