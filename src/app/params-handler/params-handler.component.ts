import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-params-handler',
  templateUrl: './params-handler.component.html',
  styleUrls: ['./params-handler.component.css']
})
export class ParamsHandlerComponent implements OnInit {
  canto!: string;

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.canto = params['canto'];
      });
  }
}
