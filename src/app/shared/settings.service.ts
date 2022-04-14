import { Settings } from './settings.model';

export class ServiceSettings {
    private settings: Settings = {
        showMetric: false, showParaphrase: true, showNotes: true
    }

    getSettings() {
        return this.settings;
    }

    setSettings(key: keyof Settings) {
        this.settings[key] = !this.settings[key];
    }
}