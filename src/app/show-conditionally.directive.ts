import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { JsonNode } from './jsonNode.model';

@Directive({
  selector: '[appShowConditionally]'
})
export class ShowConditionallyDirective {
  //@Input() data: JsonNode | undefined;
  @Input() set appShowConditionally(condition: boolean | null | undefined) {
      if (condition) {
        this.vcRef.createEmbeddedView(this.templateRef);
      } else {
        this.vcRef.clear();
        console.log(this)
      }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { 
    //console.log(this.data);
    // console.log(this.vcRef)
  }
}



/*
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { RulesServices } from './rules.service';
import { Rule } from './rule.model';
import { JsonNode } from './jsonNode.model';

@Directive({
  selector: '[appShowConditionally]'
})
export class ShowConditionallyDirective {
  rules = this.rulesservices.rules;
  @Input() set appShowConditionally(data: JsonNode) {
      let rule = this.findRule(data);
      // console.log(rule);
      if (!rule?.condition && !data.isText) {
        this.vcRef.createEmbeddedView(this.templateRef);
      } else if (!rule?.condition && data.isText && !data.tagName) {
        this.vcRef.createEmbeddedView(this.templateRef);
      } else if (!rule?.condition && data.isText && data.tagName) {
        this.vcRef.clear();
      } else if (rule?.condition && data.isText && data.tagName) {
        this.vcRef.createEmbeddedView(this.templateRef);
      }
  }

  constructor(private rulesservices: RulesServices, private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { 
    // console.log(this.rules);
  }

  isSubset(arr1: Array<{name: string, value: string}> | null, arr2: Array<{name: string, value: string}> | null) {
    if (arr1 && arr2) {
      return arr1.every((a: {name: string, value: string}) => arr2.find((b: {name: string, value: string}) => a.name === b.name && a.value === b.value))
    } else if (arr1 && (!arr2 || arr2.length < 1)) {
      return false;
    } else {
      return true;
    }
  }

  findRule(data: JsonNode) {
    return this.rules.find((e: Rule ) => (data?.tagName === e.element && this.isSubset(e.select_attr, data?.attributes)));
  }
}

 */
