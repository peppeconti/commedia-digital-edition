import { ElementRef, Renderer2 } from "@angular/core";

let rules =
  [
    {
      element: "lg",
      select: [{ attribute: 'type', value: 'terzina' }],
      attributes: [["xml:id", "id"], ["type", "class"]],
      target: "div", // default span
      before: "",
      after: "",
      content: "",
      hasEvent: false,
      events: null,
      function: null
    },
    {
      element: "l",
      select: [],
      attributes: [["type", "class"], ["n", "data-line"]],
      target: "p", // default span
      before: "",
      after: "",
      content: "",
      hasEvent: false,
      events: null,
      function: (renderer: Renderer2, elRef: ElementRef,) => {
        const lineNumber: string = elRef.nativeElement.dataset.line;
        const numberToLine = renderer.createElement('span');
        if ((+lineNumber + 2) % 3 === 0) {
          numberToLine.innerHTML = lineNumber;
        } else {
          numberToLine.innerHTML = '&nbsp';
        }
        renderer.insertBefore(elRef.nativeElement, numberToLine, elRef.nativeElement.firstChild);
      }
    },
    {
      element: "div",
      select: [{ attribute: 'type', value: 'terzina' }],
      attributes: [["xml:id", "id"]],
      target: "div", // default span
      before: "",
      after: "",
      content: "",
      hasEvent: false,
      events: undefined,
      function: undefined
    },
    {
      element: "p",
      select: [{ attribute: 'type', value: 'terzina' }],
      attributes: [["type", "class"]],
      target: "p", // default span
      before: "",
      after: "",
      content: "",
      hasEvent: false,
      events: undefined,
      function: undefined
    },
    {
      element: "lb",
      select: [{ attribute: 'type', value: 'terzina' }],
      attributes: [],
      target: "br", // default span
      before: "",
      after: "",
      content: "",
      hasEvent: false,
      events: undefined,
      function: undefined
    },
    {
      element: "note",
      select: [],
      attributes: [['type', 'class'], ['corresp', 'data-note']],
      target: "i", // default span
      before: "",
      after: "",
      content: "",
      hasEvent: true,
      events: [{event: 'click', execute: () => {console.log('ciccio')}}],
      function: undefined
    },
  ]

export default rules;