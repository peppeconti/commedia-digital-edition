import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faBookOpen, faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  faBook = faBook;
  faBookOpen = faBookOpen;
  controlActive = true;
  @Input() paraphraseActive!: boolean;
  @Output() toggleParaphrase = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  paraphraseHandler(value: boolean) {
    this.toggleParaphrase.emit(value)
  }
}
