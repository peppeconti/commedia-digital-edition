import { Component, OnInit, Input } from '@angular/core';
import { faAmericanSignLanguageInterpreting } from '@fortawesome/free-solid-svg-icons';
import { JsonNode } from './jsonNode.model';

@Component({
  selector: 'app-main-text',
  templateUrl: './main-text.component.html',
  styleUrls: ['./main-text.component.css']
})
export class MainTextComponent implements OnInit {
  @Input() main_text: JsonNode | undefined;
  @Input() rules: any;
  
  constructor() {
  }

  findRule(data: any) {
<<<<<<< HEAD
<<<<<<< HEAD
    const cc = (e: any) => {
      return e.select_attr.every((e: any) => {
      })
    }
    return this.rules.find((e: any) => {
<<<<<<< HEAD
<<<<<<< HEAD
      (data?.tagName === e.element && cc(e))
=======
      (data?.tagName === e.element)
>>>>>>> parent of a9e0ac4 (update)
=======
      (data?.tagName === e.element)
>>>>>>> parent of a9e0ac4 (update)
    });
=======
    this.rules.find((e: any) => data === e.element);
>>>>>>> parent of 36c6609 (added find transform rule)
  }

  ngOnInit(): void {
<<<<<<< HEAD
    console.log(this.main_text?.tagName);
=======
    console.log(this.rules);
    console.log(this.main_text)
    console.log(this.findRule(this.main_text));
>>>>>>> parent of a9e0ac4 (update)
=======
    this.rules.find((e: any) => data === e.element);
  }

  ngOnInit(): void {
<<<<<<< HEAD
    console.log(this.main_text?.tagName);
>>>>>>> parent of 36c6609 (added find transform rule)
=======
    console.log(this.rules);
    console.log(this.main_text)
    console.log(this.findRule(this.main_text));
>>>>>>> parent of a9e0ac4 (update)
  }
}
