import { Directive, OnInit, Input, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { CustomNode } from './customNode.model';
import trasform_rules from '../../assets/trasform-rules';

@Directive({
  selector: '[appReplaceEl]'
})
export class ReplaceElDirective implements OnInit, AfterViewInit {
  @Input() data?: CustomNode;
  rule = trasform_rules.find((e) => this.data?.tagName === e.element);

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit() {
    console.log(this.rule)
    /*if (this.terzine?.attributes && this.terzine?.tagName) {
      this.terzine?.attributes.forEach((attr) => { this.renderer.setAttribute(this.elRef.nativeElement, attr.name, attr.value) })
    }*/
  }
  ngAfterViewInit() {
    if (this.data?.tagName) {

      // console.log('ciccio');

      const rule = trasform_rules.find((e) => this.data?.tagName === e.element);
      if (rule?.function) {
        rule?.function(this.renderer, this.elRef)
        // console.log(this.elRef.nativeElement.dataset.line)
      }
      const newElementTarget = this.renderer.createElement(rule?.target || 'span');
      [...this.elRef.nativeElement.attributes].forEach(attr => { newElementTarget.setAttribute(attr.nodeName, attr.nodeValue) });
      if (!rule?.content) {
        newElementTarget.innerHTML = this.elRef.nativeElement.innerHTML;
      } else {
        newElementTarget.innerHTML = rule?.content;
      }
      if (this.elRef.nativeElement.parentNode) {
        this.elRef.nativeElement.parentNode.replaceChild(newElementTarget, this.elRef.nativeElement);
        console.log(rule?.events);
      }
      if (rule?.events) {
       rule?.events.forEach((e) => this.renderer.listen(newElementTarget, e.event, e.execute));
      }
    }
  }
}