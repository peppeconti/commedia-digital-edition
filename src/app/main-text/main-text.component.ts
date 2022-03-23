import { Component, OnInit, Input } from '@angular/core';
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

  isSubset(arr1: any, arr2: any) {
    return arr1.every((a: any) => arr2.find((b: any) => a.name === b.name && a.value === b.value))
  }

  findRule(data: any) {
    return this.rules.find((e: any) => (data?.tagName === e.element && this.isSubset(e.select_attr, data?.attributes)));
  }

  ngOnInit(): void {
  }
}

/*compare(arg_1: any, arg_2: any) {
  return arg_1.map((a: any) => {
    return arg_2.some((b: any) => {
      return a.name === b.name && a.value === b.value
    })
  }).every((e: boolean) => e === true);
}*/