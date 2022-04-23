import { Component, Input } from '@angular/core';
import { MainTextComponent } from 'src/app/main-text/main-text.component';
import { JsonNode } from '../../shared/jsonNode.model';

@Component({
  selector: 'app-note-text',
  templateUrl: './note-text.component.html',
  styleUrls: ['./note-text.component.css']
})
export class NoteTextComponent extends MainTextComponent{
  @Input() note_text: JsonNode | undefined;
  @Input() note_id?: string;

  constructor() {
    super();
  }
}