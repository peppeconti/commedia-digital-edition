import { Component, OnInit } from '@angular/core';
import { ServiceFetch } from '../shared/fetch.service';
import { JsonNode } from '../shared/jsonNode.model';

@Component({
  selector: 'app-note-container',
  templateUrl: './note-container.component.html',
  styleUrls: ['./note-container.component.css']
})
export class NoteContainerComponent implements OnInit {
  note!: JsonNode

  constructor(private serviceFetch: ServiceFetch) {
    this.serviceFetch.passNoteText.subscribe(
      (note: JsonNode) => {
        this.note = note;
        console.log(this.note);
      }
    );
  }

  ngOnInit(): void {
  }
}
