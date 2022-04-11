import { Component, OnInit, Input } from '@angular/core';
import { Settings } from '../shared/settings.model';
import { JsonNode } from '../shared/jsonNode.model';
import { ServiceFetch } from '../shared/fetch.service';

@Component({
  selector: 'app-main-text',
  templateUrl: './main-text.component.html',
  styleUrls: ['./main-text.component.css']
})
export class MainTextComponent implements OnInit {
  @Input() main_text: JsonNode | undefined;
  @Input() settings!: Settings;
  @Input() notes!: JsonNode[] | null;

  constructor(private serviceFetch: ServiceFetch) { }

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

  showNote(attribute: string | undefined) {
    const note = this.notes?.find(e => this.findAttributeValue(e.attributes, 'xml:id') === attribute?.replace('#', ''));
    this.serviceFetch.passNoteText.emit(note);
  }

  ngOnInit(): void {
  };
}
