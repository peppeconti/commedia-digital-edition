import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterContainerComponent } from './router-container/router-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  route!: { cantica: string, canto: string }

  constructor(private paramsRoute: ActivatedRoute) { }

  onOutletLoaded(component: RouterContainerComponent) {
    component.cantica = this.route.cantica;
    component.canto = this.route.canto;
  }

  ngOnInit(): void { 
    this.route = {
      cantica: this.paramsRoute.snapshot.params['cantica'],
      canto: this.paramsRoute.snapshot.params['canto']
    }
    console.log(this.paramsRoute.snapshot);
  }
}