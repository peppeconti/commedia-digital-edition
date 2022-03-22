import { Component, OnInit, Input } from '@angular/core';
import { CustomNode } from '../main-text/customNode.model';

@Component({
  selector: 'app-paraphrase',
  templateUrl: './paraphrase.component.html',
  styleUrls: ['./paraphrase.component.css']
})
export class ParaphraseComponent implements OnInit {
  @Input() paraphrase: CustomNode | undefined;
  @Input() paraphraseActive!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
