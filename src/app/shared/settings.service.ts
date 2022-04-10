import { Settings } from './settings.model';

export class ServiceSettings {
    private settings: Settings = {
        openNav: false, showMetric: false, showParaphrase: false, showNotes: false
    }

    getSettings() {
        return this.settings;
    }

    setSettings(key: keyof Settings) {
        this.settings[key] = !this.settings[key];
    }
}