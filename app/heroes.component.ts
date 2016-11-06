import { HeroService } from './hero.service';
import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';

@Component({
  selector: 'my-heroes',
  template: `
    <vaadin-grid [items]="heroes">
      <table>
        <colgroup>
          <col name="id">
          <col name="name">
          <col name="birthday">
        </colgroup>
      </table>
    </vaadin-grid>
  `,
  styles: [`
    vaadin-grid {
      height: 100%;
    }
  `]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private _heroService: HeroService) { }

  ngOnInit() {
   this.getHeroes();
  }

  private getHeroes(): void {
    this._heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }

}
