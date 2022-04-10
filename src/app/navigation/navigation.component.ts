import { Component, OnInit } from '@angular/core';
import { Settings } from '../shared/settings.model';
import { ServiceSettings } from '../shared/settings.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  settings!: Settings

  constructor(private serviceSettings: ServiceSettings) { }

  ngOnInit(): void {
    this.settings = this.serviceSettings.getSettings();
  }

}