import { Component, Input, ViewChildren, QueryList, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { MainTextComponent } from 'src/app/main-text/main-text.component';
import { JsonNode } from '../../shared/jsonNode.model';
import { ServiceEvent } from '../../shared/event.service';

@Component({
  selector: 'app-paraphrase-text',
  templateUrl: './paraphrase-text.component.html',
  styleUrls: ['./paraphrase-text.component.css']
})
export class ParaphraseTextComponent extends MainTextComponent implements AfterViewInit, OnInit {
  @Input() main_text: JsonNode | undefined;
  @ViewChildren('paraphrFragm') paraphGroup!: QueryList<ElementRef>;

  constructor(private serviceEvt: ServiceEvent) {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.paraphGroup.changes.subscribe(
      a => this.serviceEvt.passParaphrFragm.emit(a)
    );
  }
}
