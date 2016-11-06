import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="hero"> <!-- // NOTE: The hero object is retrived asynchronously after the component initialization. At this time when the retrieval starts, the component template is already rendered, but the hero is not loaded yet, so we can not use hero.name and hero.birthday sub-properties. Using them at this time would result in errors.-->
      <paper-input label="Name" [(value)]="hero.name"></paper-input>
      <vaadin-date-picker label="Birthday" [(value)]="hero.birthday"></vaadin-date-picker>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px;
    }
  `]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  private _routeParamsSubscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _heroService: HeroService
  ) { }

  ngOnInit() {
    this._routeParamsSubscription = this._route.params.subscribe( params => {
      let id = +params['id']; // NOTE: (+) convierte el Sting 'id' en un numero
      this._heroService.getHero(id)
        .then(hero => this.hero = hero); // Asigna el heroe segun la ID de la URL
    });
  }

  ngOndestroy() {
    this._routeParamsSubscription.unsubscribe(); // NOTE: se desuscribe (para eso es para lo que usa una vble de tipo Subscription arriba)
  }
}
