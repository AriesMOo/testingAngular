import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-app',
  template: `
  <app-header-layout>
    <app-header>
      <app-toolbar>
        <paper-icon-button icon="menu" (click)="togglePolymerDrawer()"></paper-icon-button>
        <div main-title spacer>App name</div>
      </app-toolbar>
    </app-header>

    main content

    <router-outlet></router-outlet>

    <app-drawer id="panel">
      drawer-content
    </app-drawer>
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

    app-drawer {
      //--app-drawer-width: 400px;
      //--app-drawer-scrim-background: var(--primary-color);
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

  togglePolymerDrawer() {
    document.querySelector('#panel').toggle();
  }
}
