import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainTextComponent } from './main-text/main-text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransformDirective } from './transform.directive';
import { ParaphraseComponent } from './paraphrase/paraphrase.component';
import { SettingsComponent } from './settings/settings.component';
import { ShowConditionallyDirective } from './show-conditionally.directive';
import { RulesServices } from './rules.service';

@NgModule({
  declarations: [
    AppComponent,
    MainTextComponent,
    TransformDirective,
    ParaphraseComponent,
    SettingsComponent,
    ShowConditionallyDirective,
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
