import { Component, OnInit, Input } from '@angular/core';
import { JsonNode } from '../shared/jsonNode.model';
import { Rule } from '../shared/rule.model';;
import { RulesServices } from '../shared/rules.service';

@Component({
  selector: 'app-paraphrase',
  templateUrl: './paraphrase.component.html',
  styleUrls: ['./paraphrase.component.css']
})
export class ParaphraseComponent implements OnInit {
  rules!: Array<Rule>;
  @Input() paraphrase: JsonNode | undefined;

  constructor(private rulesservice: RulesServices) { }

  isSubset(arr1: Array<{name: string, value: string}> | null, arr2: Array<{name: string, value: string}> | null) {
    if (arr1 && arr2) {
      return arr1.every((a: {name: string, value: string}) => arr2.find((b: {name: string, value: string}) => a.name === b.name && a.value === b.value))
    } else if (arr1 && (!arr2 || arr2.length < 1)) {
      return false;
    } else {
      return true;
    }
  }

  findRule(data: JsonNode) {
    return this.rules.find((e: Rule ) => (data?.tagName === e.element && this.isSubset(e.select_attr, data?.attributes)));
  }

  ngOnInit(): void {
    this.rules = this.rulesservice.getRules();
  }
}