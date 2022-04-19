import { Component, Input } from '@angular/core';
import { MainTextComponent } from 'src/app/main-text/main-text.component';
import { JsonNode } from '../../shared/jsonNode.model';
import { ServiceFetch } from 'src/app/shared/fetch.service';
import { ServiceEvent } from 'src/app/shared/event.service';

@Component({
  selector: 'app-note-text',
  templateUrl: './note-text.component.html',
  styleUrls: ['./note-text.component.css']
})
export class NoteTextComponent extends MainTextComponent{
  @Input() note_text: JsonNode | undefined;
  @Input() note_id?: string;

  constructor(serviceFetch: ServiceFetch, serviceEvt: ServiceEvent) {
    super(serviceFetch, serviceEvt);
  }
}
