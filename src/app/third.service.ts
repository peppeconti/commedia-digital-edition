import { Renderer2, ElementRef, Injectable } from "@angular/core";
import { MainTextComponent } from "./main-text/main-text.component";
import { Rule } from "./rule.model";

@Injectable()

export class ThirdServices {

    settings: { showNote: boolean, showParaphrase: boolean, showMetric: boolean } = {
        showNote: false,
        showParaphrase: false,
        showMetric: true
    }

    rules: Array<Rule> =

        [
            {
                element: "caesura",
                select_attr: [
                    {
                        name: 'rend',
                        value: 'switch'
                    }
                ],
                attributes_transform: [
                    {
                        start: 'rend',
                        target: 'class'
                    }
                ],
                attributes: null,
                target: "span",
                before: null,
                after: null,
                content: [
                    {
                        type: 'text',
                        content: ' || '
                    }
                ],
                events: null,
                ex_function: null,
                condition: this.maintext.settings.showMetric
            },
            {
                element: "span",
                select_attr: [
                    {
                        name: 'rend',
                        value: 'paraphrase-fragment'
                    }
                ],
                attributes_transform: [
                    {
                        start: 'rend',
                        target: 'class'
                    }
                ],
                attributes: null,
                target: "span",
                before: null,
                after: null,
                content: null,
                events: null,
                ex_function: null,
                condition: null
            },
            {
                element: "div",
                select_attr: [
                    {
                        name: 'rend',
                        value: 'paraphrase-terzina'
                    }
                ],
                attributes_transform: [
                    {
                        start: 'xml:id',
                        target: 'id'
                    },
                    {
                        start: 'rend',
                        target: 'class'
                    }
                ],
                attributes: null,
                target: "div",
                before: null,
                after: null,
                content: null,
                events: null,
                ex_function: null,
                condition: null
            },
            {
                element: "p",
                select_attr: [
                    {
                        name: 'rend',
                        value: 'terzina-paraphrase'
                    }
                ],
                attributes_transform: [
                    {
                        start: 'rend',
                        target: 'class'
                    }
                ],
                attributes: null,
                target: "p",
                before: null,
                after: null,
                content: null,
                events: null,
                ex_function: null,
                condition: null
            },
            {
                element: "lb",
                select_attr: [],
                attributes_transform: [],
                attributes: null,
                target: "br",
                before: null,
                after: null,
                content: null,
                events: null,
                ex_function: null,
                condition: null
            },
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
                ex_function: null,
                condition: null
            },
            {
                element: "l",
                select_attr: [
                    {
                        name: 'rend',
                        value: 'endecasillabo'
                    }
                ],
                attributes_transform: [
                    {
                        start: 'n',
                        target: 'data-line'
                    },
                    {
                        start: 'rend',
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
                },
                condition: null
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
                ex_function: null,
                condition: null
            },
        ];

    constructor(private maintext: MainTextComponent) {

    }
}