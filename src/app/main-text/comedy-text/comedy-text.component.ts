import { Component, Input, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { MainTextComponent } from 'src/app/main-text/main-text.component';
import { JsonNode } from '../../shared/jsonNode.model';
import { ServiceEvent } from '../../shared/event.service';
import { Settings } from '../../shared/settings.model';

@Component({
  selector: 'app-comedy-text',
  templateUrl: './comedy-text.component.html',
  styleUrls: ['./comedy-text.component.css']
})
export class ComedyTextComponent extends MainTextComponent implements AfterViewInit {
  @Input() main_text: JsonNode | undefined;
  @Input() settings!: Settings;
  @ViewChildren('terzina') terzineGroup!: QueryList<ElementRef>;
  
  showNote(attribute: string | undefined) {
    this.serviceEvt.passNoteText.emit(attribute);
  }

  constructor(private serviceEvt: ServiceEvent) {
    super();
  }

  ngAfterViewInit() {
    this.terzineGroup.changes.subscribe(
      a => this.serviceEvt.passTerzine.emit(a)
    );
  }
}
