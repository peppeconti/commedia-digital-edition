import { Renderer2, ElementRef, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rule } from "./rule.model";

@Injectable()

export class RulesServices {

    settings: {showNote: boolean, showParaphrase: boolean} = {
        showNote: false,
        showParaphrase: false
    }

    rules: Array<Rule> =

        [
            {
                element: "lg",
                select_attr: [
                    {
                        name: 'type',
                        value: 'terzina'
                    }
                ],
                attributes_transform: [
                    {
                        start: 'xml:id',
                        target: 'id'
                    },
                    {
                        start: 'type',
                        target: 'class'
                    }
                ],
                attributes: null,
                target: "div",
                before: null,
                after: null,
                content: null,
                events: null,
                ex_function: null
            },
            {
                element: "l",
                select_attr: [],
                attributes_transform: [
                    {
                        start: 'n',
                        target: 'data-line'
                    },
                    {
                        start: 'type',
                        target: 'class'
                    }
                ],
                attributes: null,
                target: "p",
                before: null,
                after: null,
                content: null,
                events: null,
                ex_function: (renderer: Renderer2, elRef: ElementRef,) => {
                    const lineNumber: string = elRef.nativeElement.dataset.line;
                    const numberToLine: Element = renderer.createElement('span');
                    renderer.addClass(numberToLine, 'line-number');
                    if ((Number(lineNumber) + 2) % 3 === 0) {
                        numberToLine.innerHTML = `${lineNumber}.`;
                    } else {
                        numberToLine.innerHTML = '&nbsp';
                    }
                    renderer.insertBefore(elRef.nativeElement, numberToLine, elRef.nativeElement.firstChild);
                }
            },
            {
                element: "lb",
                select_attr: null,
                attributes_transform: null,
                attributes: null,
                target: "br",
                before: null,
                after: null,
                content: null,
                events: null,
                ex_function: null
            },
            {
                element: "div",
                select_attr: null,
                attributes_transform: null,
                attributes: null,
                target: "div",
                before: null,
                after: null,
                content: null,
                events: null,
                ex_function: null
            },
            {
                element: "p",
                select_attr: null,
                attributes_transform: null,
                attributes: null,
                target: "p",
                before: null,
                after: null,
                content: null,
                events: null,
                ex_function: null
            },
            {
                element: "note",
                select_attr: [],
                attributes_transform: [
                    {
                        start: 'corresp',
                        target: 'data-note'
                    },
                    {
                        start: 'type',
                        target: 'class'
                    }
                ],
                attributes: null,
                target: "span",
                before: null,
                after: null,
                content: null,
                events: [
                    {
                        event: 'click',
                        execute: (event: Event) => {
                            event.stopPropagation();
                            this.settings.showNote = true;
                        }
                    }
                ],
                ex_function: null
            },
        ];

    constructor(private http: HttpClient, private renderer: Renderer2) {

    }

    fetchData(){
        return this.http.get('assets/data/divina_commedia.xml', {
            headers: new HttpHeaders()
                .set('Content-Type', 'text/xml')
                .append('Access-Control-Allow-Methods', 'GET')
                .append('Access-Control-Allow-Origin', '*')
                .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
            responseType: 'text'
        })
    }
}