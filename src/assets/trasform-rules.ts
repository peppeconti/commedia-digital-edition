import { ElementRef, Renderer2 } from "@angular/core";
import { Rule } from '../app/main-text/rule.model';

let rules: Array<Rule> =
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
        const numberToLine = renderer.createElement('span');
        renderer.addClass(numberToLine, 'line-number');
        if ((+lineNumber + 2) % 3 === 0) {
          numberToLine.innerHTML = `${lineNumber}.`;
        } else {
          numberToLine.innerHTML = '&nbsp';
        }
        renderer.insertBefore(elRef.nativeElement, numberToLine, elRef.nativeElement.firstChild);
      }
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
          execute: (event: Event, showNote: boolean) => { 
            event.stopPropagation();
            showNote = !showNote }
        }
      ],
      ex_function: null
    },
  ]

export default rules;