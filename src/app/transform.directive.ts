import { Directive, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { JsonNode } from './main-text/jsonNode.model';

@Directive({
  selector: '[appTransform]'
})
export class TransformDirective implements OnInit {
  @Input() rule: any;
  @Input() data?: JsonNode;

  findAttributeValue(attributes: [{ name: string, value: string }] | null | undefined, attribute: string) {
    const val = attributes?.find(e => e.name === attribute);
    return val?.value;
  }

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit() {
    if (this.rule) {
      if (this.rule.attributes_transform && this.rule.attributes_transform.length > 0) {
        this.rule.attributes_transform.forEach((attr: any) => {
          return this.renderer.setAttribute(this.elRef.nativeElement, attr.target, this.findAttributeValue(this.data?.attributes, attr.start) || 'no-attr-found');
        });
      }
    }
  }
}