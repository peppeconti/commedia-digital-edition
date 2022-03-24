import { Directive, OnInit, Input, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { JsonNode } from './main-text/jsonNode.model';
import { Rule } from './main-text/rule.model';

@Directive({
  selector: '[appTransform]'
})
export class TransformDirective implements OnInit, AfterViewInit {
  @Input() rule?: Rule;
  @Input() data?: JsonNode;
  @Input() showNote!: boolean ;

  findAttributeValue(attributes: [{ name: string, value: string }] | null | undefined, attribute: string) {
    const val = attributes?.find(e => e.name === attribute);
    return val?.value;
  }

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit() {
    if (this.rule) {
      if (this.rule.attributes_transform && this.rule.attributes_transform.length > 0 && (this.data?.attributes && this.data!.attributes.length > 0)) {
        this.rule.attributes_transform.forEach((attr: { start: string, target: string }) => {
          return this.renderer.setAttribute(this.elRef.nativeElement, attr.target, this.findAttributeValue(this.data?.attributes, attr.start) || '404');
        });
      }
      if (this.rule.attributes) {
        this.rule.attributes.forEach((attr: { name: string, value: string }) => {
          if (attr.name === 'class') {
            return this.renderer.addClass(this.elRef.nativeElement, attr.value);
          } else {
            return this.renderer.setAttribute(this.elRef.nativeElement, attr.name, attr.value);
          }
        });
      }
    }
  }
  ngAfterViewInit() {
    if (this.rule) {
      // execute single function for every element, if present
      if (this.rule?.ex_function) {
        this.rule?.ex_function(this.renderer, this.elRef)
      }
      // replace span element copyng attributes and adding event to new element
      const replaceElement = (source: ElementRef<any>, newType: string) => {
        // Create the document fragment 
        const frag = document.createDocumentFragment();
        // Fill it with what's in the source element 
        while (source.nativeElement.firstChild) {
          frag.appendChild(source.nativeElement.firstChild);
        }
        // Create the new element 
        const newElem = document.createElement(newType);
        // Add events from rule
        if (this.rule?.events) {
          this.rule.events.forEach((e: { event: string, execute: Function }) =>
            this.renderer.listen(newElem, e.event, (event) => { e.execute(event, this.showNote) })
          )
        };
        [...source.nativeElement.attributes].forEach(attr => { newElem.setAttribute(attr.nodeName, attr.nodeValue) });
        // Empty the document fragment into it 
        newElem.appendChild(frag);
        // Replace the source element with the new element on the page 
        source.nativeElement.parentNode.replaceChild(newElem, source.nativeElement);
      }
      // calling the replacing function
      replaceElement(this.elRef, this.rule?.target || 'span')
    }
  }
}