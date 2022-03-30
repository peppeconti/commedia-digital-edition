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
  //setting_par!: { showParaphrase: boolean};
  //setting_metr!: { showMetric: boolean };

  constructor(private rulesservice: RulesServices) { }

  ngOnInit(): void { 
    //this.setting_par = { showParaphrase: this.rulesservice.settings.showParaphrase }
    //this.setting_metr = { showMetric: this.third.settings.showMetric }
  }

  paraphraseHandler() {
    this.rulesservice.settings.showParaphrase = !this.rulesservice.settings.showParaphrase;
    //this.settings = { showParaphrase: this.rulesservice.settings.showParaphrase, showMetric: this.rulesservice.settings.showMetric }
  }
  hideMetricalStructure() {
    this.rulesservice.inline_settings.showMetric = !this.rulesservice.inline_settings.showMetric;
    this.rulesservice.inline_settings.noShowMetric = !this.rulesservice.inline_settings.noShowMetric;
    //this.settings = { showParaphrase: this.rulesservice.settings.showParaphrase, showMetric: this.rulesservice.settings.showMetric }
  }
}
