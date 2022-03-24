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
      content: [
        {
          type: 'attr',
          name: 'xml:id'
        },
        {
          type: 'text',
          name: 'ciao'
        },
      ],
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
        if ((+lineNumber + 2) % 3 === 0) {
          numberToLine.innerHTML = lineNumber;
        } else {
          numberToLine.innerHTML = '&nbsp';
        }
        renderer.insertBefore(elRef.nativeElement, numberToLine, elRef.nativeElement.firstChild);
      }
    }
  ]

export default rules;