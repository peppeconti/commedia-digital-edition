import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainTextComponent } from './main-text/main-text.component';
import { AddAttrDirective } from './main-text/add-attr.directive';
import { ReplaceElDirective } from './main-text/replace-el.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingsComponent } from './settings/settings.component';
import { ParaphraseComponent } from './paraphrase/paraphrase.component';

@NgModule({
  declarations: [
    AppComponent,
    MainTextComponent,
    AddAttrDirective,
    ReplaceElDirective,
    SettingsComponent,
    ParaphraseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
