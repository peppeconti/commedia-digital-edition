import { Component, OnInit } from '@angular/core';
import { faBookOpen, faBook } from '@fortawesome/free-solid-svg-icons';
import { RulesServices } from '../rules.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  faBook = faBook;
  faBookOpen = faBookOpen;
  controlActive = true;
  settings: { showParaphrase: boolean } = { showParaphrase: this.rulesservice.settings.showParaphrase };

  constructor(private rulesservice: RulesServices) { }

  ngOnInit(): void { }

  paraphraseHandler() {
    this.rulesservice.settings.showParaphrase = !this.rulesservice.settings.showParaphrase
  }
}
