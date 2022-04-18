import { Directive, OnInit, Input } from '@angular/core';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

@Directive({
  selector: '[appAlign]'
})
export class AlignDirective implements OnInit {
  @Input() scrolltrigger!: Array<ScrollTrigger>;
 
  constructor() {
  }
  
  ngOnInit(): void {
  }
}