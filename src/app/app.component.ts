import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Breadcrumb } from 'projects/ngcx-breadcrumb/src/lib/models/breadcrumb';
import { BreadcrumbType } from 'projects/ngcx-breadcrumb/src/lib/models/breadcrumb-type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'appForBreadcrumb';
  public idWildcard = 'id';
  public homeRoute = 'secure/dashboard';
  private subs: Subscription[] = [];
  public currentNavigatedUrl = '';
  public currentRoute = '';

  public readonly allBreadcrumbs: Breadcrumb[] = [
    {
      name: 'secure',
      title: '',
      route: 'secure',
      absoluteRoute: 'secure',
      type: BreadcrumbType.Static,
      breadcrumbs: [
        {
          name: 'freight-exchange',
          title: 'SHARED.SECTION-TITLE-FREIGHT-EXCHANGE',
          route: 'freight-exchange',
          absoluteRoute: 'secure/freight-exchange',
          type: BreadcrumbType.Static,
          breadcrumbs: null,
        },
        {
          name: 'order-list',
          title: 'SHARED.SECTION-TITLE-ORDER-LIST',
          route: 'order-list',
          absoluteRoute: 'secure/order-list',
          type: BreadcrumbType.Static,
          show: true,
          breadcrumbs: [
            //*Order matters
            {
              name: this.idWildcard,
              title: 'ORDER-LIST-DETAILS.TRANSPORT-INFORMATION-ORDER',
              subTitle: '',
              route: 'order-list',
              absoluteRoute: 'secure/order-list',
              isId: true,
              type: BreadcrumbType.Dynamic,
              show: true,
              showBreadcrumb: true,
              breadcrumbs: [
                {
                  name: 'transport',
                  title: 'SHARED.SECTION-TITLE-TRANSPORT',
                  route: 'transport',
                  shortTitle: 'TI',
                  absoluteRoute: `secure/order-list/${this.idWildcard}/transport`,
                  type: BreadcrumbType.Static,
                  show: true,
                  breadcrumbs: null,
                  // isLast: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentNavigatedUrl = event.url;
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  ngOnDestroy(): void {}
}
