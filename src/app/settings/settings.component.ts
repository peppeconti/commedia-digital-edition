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
  settings!: { showParaphrase: boolean, showMetric: boolean };

  constructor(private rulesservice: RulesServices) { }

  ngOnInit(): void { 
    this.settings = { showParaphrase: this.rulesservice.settings.showParaphrase, showMetric: this.rulesservice.settings.showMetric }
  }

  paraphraseHandler() {
    this.rulesservice.settings.showParaphrase = !this.rulesservice.settings.showParaphrase;
    this.settings = { showParaphrase: this.rulesservice.settings.showParaphrase, showMetric: this.rulesservice.settings.showMetric }
  }
  hideMetricalStructure() {
    this.rulesservice.settings.showMetric = !this.rulesservice.settings.showMetric;
    this.settings = { showParaphrase: this.rulesservice.settings.showParaphrase, showMetric: this.rulesservice.settings.showMetric }
    console.log(this.rulesservice.settings.showMetric);
  }
}
