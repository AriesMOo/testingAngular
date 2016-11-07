import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  selector: 'my-heroes',
  template: `
    <vaadin-grid [items]="heroes" (selected-items-changed)="onSelectedItemsChanged($event)">
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

  constructor(
    private _router: Router,
    private _heroService: HeroService) { }

  ngOnInit() {
   this.getHeroes();
  }

  onSelectedItemsChanged(event: any) {
    let selectedHeroIndex: number = event.target.selection.selected()[0];
    if (selectedHeroIndex !== undefined) {
      this.onSelect(this.heroes[selectedHeroIndex]);
    }
  }

  private onSelect(hero: Hero): void {
    this._router.navigate(['/heroes', hero.id]);
  }

  private getHeroes(): void {
    this._heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }

}
