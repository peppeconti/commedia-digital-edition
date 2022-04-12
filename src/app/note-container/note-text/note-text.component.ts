import { Component, OnInit, Input } from '@angular/core';
import { JsonNode } from '../../shared/jsonNode.model';

@Component({
  selector: 'app-note-text',
  templateUrl: './note-text.component.html',
  styleUrls: ['./note-text.component.css']
})
export class NoteTextComponent implements OnInit {
  @Input() note_text: JsonNode | undefined;
  @Input() note_id?: string;

  constructor() { }

  isSubset(arr1: [{ name: string, value: string }], arr2: Array<{ name: string, value: string }> | null) {
    if (arr1 && arr2) {
      return arr1.every((a: { name: string, value: string }) => arr2.find((b: { name: string, value: string }) => a.name === b.name && a.value === b.value))
    } else if (arr1 && (!arr2 || arr2.length < 1)) {
      return false;
    } else {
      return true;
    }
  };

  findAttributeValue(attributes: Array<{ name: string, value: string }> | null, attribute: string) {
    const val = attributes?.find(e => e.name === attribute);
    return val?.value;
  };

  ngOnInit(): void {
  }

}
