import { Component, OnInit, Input } from '@angular/core';
import { JsonNode } from '../shared/jsonNode.model';
import { Rule } from '../shared/rule.model';
import { Settings } from '../shared/settings.model';
import { RulesServices } from '../shared/rules.service';

@Component({
  selector: 'app-main-text',
  templateUrl: './main-text.component.html',
  styleUrls: ['./main-text.component.css']
})
export class MainTextComponent implements OnInit {
  rules!: Array<Rule>;
  @Input() main_text: JsonNode | undefined;
  @Input() rule: Rule | undefined;
  // noCondition = true;
  settings: Settings = this.rulesservice.inline_settings;

  constructor(private rulesservice: RulesServices) {}

  isSubset(arr1: Array<{ name: string, value: string }> | null, arr2: Array<{ name: string, value: string }> | null) {
    if (arr1 && arr2) {
      return arr1.every((a: { name: string, value: string }) => arr2.find((b: { name: string, value: string }) => a.name === b.name && a.value === b.value))
    } else if (arr1 && (!arr2 || arr2.length < 1)) {
      return false;
    } else {
      return true;
    }
  }

  findRule(data: JsonNode) {
    return this.rules.find((e: Rule) => (data?.tagName === e.element && this.isSubset(e.select_attr, data?.attributes)));
  }

  ngOnInit(): void {
    this.rules = this.rulesservice.getRules();
    //console.log(this.rule?.condition)
  }
}

// VERSION BY ME OF isSubset

/*compare(arg_1: any, arg_2: any) {
  return arg_1.map((a: any) => {
    return arg_2.some((b: any) => {
      return a.name === b.name && a.value === b.value
    })
  }).every((e: boolean) => e === true);
}*/