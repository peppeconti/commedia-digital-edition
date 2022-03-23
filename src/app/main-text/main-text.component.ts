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

  findRule(data: any) {
    return this.rules.find((e: any) => data?.tagName === e.element);
  }

  ngOnInit(): void {
  }
}
