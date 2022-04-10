import { Settings } from "./settings.model";

export class Switch {
    constructor(public name: string, public label: string, public action: keyof Settings) {
    }
}