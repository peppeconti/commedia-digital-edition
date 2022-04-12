import { Component, OnInit, Input } from '@angular/core';
import { ServiceFetch } from '../shared/fetch.service';
import { JsonNode } from '../shared/jsonNode.model';

@Component({
  selector: 'app-note-container',
  templateUrl: './note-container.component.html',
  styleUrls: ['./note-container.component.css']
})
export class NoteContainerComponent implements OnInit {
  @Input() notes!: JsonNode;
  note_id!: string

  constructor(private serviceFetch: ServiceFetch) {
    this.serviceFetch.passNoteText.subscribe(
      (note: string) => {
        this.note_id = note.replace('#', '');
        console.log(this.note_id);
      }
    );
  }

  ngOnInit(): void {
  }
}
