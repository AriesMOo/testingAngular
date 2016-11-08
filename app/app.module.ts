import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PolymerElement } from '@vaadin/angular2-polymer';

import { appRoutingProviders, routing } from './app.routing';
import { AppComponent }  from './app.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

@NgModule({
  imports:      [ BrowserModule, routing ],
  declarations: [
    AppComponent,
    PolymerElement('app-header-layout'),
    PolymerElement('app-header'),
    PolymerElement('app-toolbar'),
    HeroesComponent,
    PolymerElement('vaadin-grid'),
    HeroDetailComponent,
    PolymerElement('paper-input'),
    PolymerElement('vaadin-date-picker'),
    PolymerElement('app-drawer')
  ],
  providers: [ HeroService, appRoutingProviders ],
  bootstrap:    [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
