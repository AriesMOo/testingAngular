import { HeroService } from './hero.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PolymerElement } from '@vaadin/angular2-polymer';

import { AppComponent }  from './app.component';
import { HeroesComponent } from './heroes.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [
    AppComponent,
    PolymerElement('app-header-layout'),
    PolymerElement('app-header'),
    PolymerElement('app-toolbar'),
    HeroesComponent,
    PolymerElement('vaadin-grid')
  ],
  providers: [ HeroService ],
  bootstrap:    [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
