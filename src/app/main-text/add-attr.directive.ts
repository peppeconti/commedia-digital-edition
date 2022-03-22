import { Directive, OnInit, Input, Renderer2, ElementRef} from '@angular/core';
import { CustomNode } from './customNode.model';
import trasform_rules from '../../assets/trasform-rules';

@Directive({
  selector: '[appAddAttr]'
})
export class AddAttrDirective implements OnInit {
  @Input() data?: CustomNode;

  findAttributeValue(attributes: [{ name: string, value: string }] | null | undefined, attribute: string) {
    const val = attributes?.find(e => e.name === attribute);
    return val?.value;
  }

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit() {
    const rule = trasform_rules.find((e) => this.data?.tagName === e.element);
    rule?.attributes.forEach((attr) => {
      return this.renderer.setAttribute(this.elRef.nativeElement, attr[1], this.findAttributeValue(this.data?.attributes, attr[0]) || 'no-attr-found');
    });
  }
}
