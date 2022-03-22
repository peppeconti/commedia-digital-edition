import { Component, OnInit, Input } from '@angular/core';
import { CustomNode } from './customNode.model';

@Component({
  selector: 'app-main-text',
  templateUrl: './main-text.component.html',
  styleUrls: ['./main-text.component.css']
})
export class MainTextComponent implements OnInit {
  @Input() terzine: CustomNode | undefined;
  @Input() rules: any;
  
  constructor() {
  }

  findRule(data: any) {
    this.rules.find((e: any) => data === e.element);
  }

  ngOnInit(): void {
  }
}