import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookOpen, faBook, faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { NavigationComponent } from './navigation/navigation.component';
import { ServiceSettings } from './shared/settings.service';
import { ServiceFetch } from './shared/fetch.service';
import { ServiceEvent } from './shared/event.service';
import { MainTextComponent } from './main-text/main-text.component';
import { DropdownComponent } from './header/dropdown/dropdown.component';
import { NoteContainerComponent } from './note-container/note-container.component';
import { NoteTextComponent } from './note-container/note-text/note-text.component';
import { AlignDirective } from './directive/align.directive';
import { ComedyTextComponent } from './main-text/comedy-text/comedy-text.component';
import { ParaphraseTextComponent } from './main-text/paraphrase-text/paraphrase-text.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    MainTextComponent,
    DropdownComponent,
    NoteContainerComponent,
    NoteTextComponent,
    AlignDirective,
    ComedyTextComponent,
    ParaphraseTextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [ServiceSettings, ServiceFetch, ServiceEvent],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(faBook, faBookOpen, faInfoCircle, faBars);
  }
}