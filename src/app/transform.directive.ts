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
}