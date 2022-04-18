import { Component, OnInit } from '@angular/core';
import { Settings } from '../../shared/settings.model';
import { ServiceSettings } from '../../shared/settings.service';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})
export class HamburgerComponent implements OnInit {
  settings!: Settings

  constructor(private serviceSettings: ServiceSettings) { }

  openSidebar(key: keyof Settings) {
    this.serviceSettings.setSettings(key);
  }

  ngOnInit(): void {
    this.settings = this.serviceSettings.getSettings();
  }

}