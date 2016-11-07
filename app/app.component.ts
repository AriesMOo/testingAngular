import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-app',
  template: `
    <app-header-layout has-scrolling-region>
      <app-header fixed>
        <app-toolbar [class.raised]="isInChildView">
          <paper-icon-button class="flecha" icon="arrow-back" *ngIf="isInChildView" (click)="goBack()"></paper-icon-button>
          <div title spacer>{{title}}</div>
          <paper-icon-button icon="search"></paper-icon-button>
        </app-toolbar>
      </app-header>
      <router-outlet></router-outlet>
    </app-header-layout>
  `,
  styles: [`
    app-toolbar {
      background: var(--primary-color);
      color: var(--dark-theme-text-color);
    }
    app-toolbar.raised {
      @apply(--shadow-elevation-4dp);
    }

    paper-icon-button.flecha {
      position: absolute;
      top: 12px;
      left: 8px;
    }
  `]
})
export class AppComponent implements OnInit {
  title = '';
  isInChildView = false;
  private _routerSubscription: Subscription;

  constructor(private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this._routerSubscription = this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let route = this._route.snapshot;
        while (route.firstChild) {
          route = route.firstChild;
        }
        this.title = route.data['title']; // NOTE: se le pasa un dato (el titulo) a cada ruta sin usar servicios ni hostias (esta en la app.routing.ts)
        this.isInChildView = !route.data['root']; // NOTE: el valor root es un valor definido en app.routing.ts como el TITULO !!
      }
    });
  }

  ngOnDestroy() {
    this._routerSubscription.unsubscribe();
  }

  goBack() {
    this._router.navigate(['/heroes']);
  }
}
