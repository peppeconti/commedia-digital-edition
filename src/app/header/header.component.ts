import { Component, OnInit } from '@angular/core';
import { Switch } from '../shared/switch.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  switch_list: Array<Switch> = [
    { name: 'paraphrase', label: 'Parafrasi', action: 'showParaphrase' },
    { name: 'metric', label: 'Metrica', action: 'showMetric' },
    { name: 'notes', label: 'Note', action: 'showNotes' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
