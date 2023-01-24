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
  public vehicleIdWildcard = 'vehicleId';
  public homeRoute = 'main/dashboard';
  private subs: Subscription[] = [];
  public currentNavigatedUrl = '';
  public currentRoute = '';

  public readonly allBreadcrumbs: Breadcrumb[] = [
    {
      name: 'main',
      title: '',
      route: 'main',
      absoluteRoute: 'main',
      type: BreadcrumbType.Static,
      breadcrumbs: [
        {
          name: 'reports-list',
          title: 'reportsList',
          route: 'reports-list',
          absoluteRoute: 'main/reports-list',
          type: BreadcrumbType.Static,
          breadcrumbs: null,
        },
        {
          name: 'order-list',
          title: 'orderList',
          route: 'order-list',
          absoluteRoute: 'main/order-list',
          type: BreadcrumbType.Static,
          show: true,
          breadcrumbs: [
            //*Order matters
            {
              name: this.idWildcard,
              title: 'orderList',
              subTitle: '',
              route: 'order-list',
              absoluteRoute: `main/order-list/${this.idWildcard}`,
              //*Order matters
              wildCards: [this.idWildcard],
              isId: true,
              type: BreadcrumbType.Dynamic,
              show: true,
              showBreadcrumb: true,
              breadcrumbs: [
                {
                  name: 'transport',
                  title: 'Transport Info',
                  route: 'transport',
                  shortTitle: 'TI',
                  wildCards: [this.idWildcard],
                  absoluteRoute: `main/order-list/${this.idWildcard}/transport`,
                  type: BreadcrumbType.Static,
                  show: true,
                  breadcrumbs: [
                    {
                      name: 'vehicle',
                      title: 'Vehicle Info',
                      route: 'vehicle',
                      wildCards: [this.idWildcard, this.vehicleIdWildcard],
                      absoluteRoute: `main/order-list/${this.idWildcard}/transport/${this.vehicleIdWildcard}`,
                      type: BreadcrumbType.Dynamic,
                      show: true,
                      breadcrumbs: null,
                    },
                  ],
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
