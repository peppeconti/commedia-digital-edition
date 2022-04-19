import { EventEmitter, QueryList, ElementRef } from "@angular/core";

export class ServiceEvent {

    passNoteText = new EventEmitter<string>();
    passParaphrFragm = new EventEmitter<QueryList<ElementRef>>();

    constructor() { }
}