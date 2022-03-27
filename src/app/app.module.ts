import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainTextComponent } from './main-text/main-text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransformDirective } from './transform.directive';
import { RulesServices } from '../app/rules.service';

@NgModule({
  declarations: [
    AppComponent,
    MainTextComponent,
    TransformDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [RulesServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
