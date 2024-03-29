import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ServiceSettings } from '../../shared/settings.service';
import { Settings } from '../../shared/settings.model';
import { Switch } from '../../shared/switch.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() switch_list!: Array<Switch>;
  settings!: Settings;
  open = false;

  constructor(private serviceSettings: ServiceSettings) { }

  ngOnInit(): void {
    this.settings = this.serviceSettings.getSettings();
  }

  toggleMenu() {
    this.open = !this.open;
  }

  handleSettings(key: keyof Settings) {
    this.serviceSettings.setSettings(key);
  }
}
