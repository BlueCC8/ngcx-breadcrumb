import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Breadcrumb } from '../models/breadcrumb';
import { BreadcrumbType } from '../models/breadcrumb-type';
import { PageInfo } from '../models/page-info';
import { NgcxBreadcrumbService } from '../ngcx-breadcrumb.service';

@Component({
  selector: 'ngcx-breadcrumb',
  templateUrl: './ngcx-breadcrumb.component.html',
  styleUrls: ['./ngcx-breadcrumb.component.scss'],
})
export class NgcxBreadcrumbComponent implements OnInit, OnDestroy {
  @Input() isMobile = false;
  @Input() homeRoute = '#';
  @Input() allBreadcrumbs: Breadcrumb[] = [];
  @Input() idWildCards: string[] = [];
  @Input() currentNavigatedUrl: string = '';
  @Input() currentRoute = '';

  breadcrumbs: Breadcrumb[] = [];
  private fragments;
  private currentBreadcrumb: Breadcrumb;
  private subs: Subscription[] = [];

  private allWildCards: Map<string, string> = new Map();

  constructor(
    private breadcrumbService: NgcxBreadcrumbService,
    private router: Router
  ) {}

  get showBreadcrumb() {
    return this.breadcrumbs.some((breadcrumb) => breadcrumb.showBreadcrumb);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
  ngOnInit(): void {
    this.subs.push(
      this.breadcrumbService.pageInfoSubject$.subscribe((pageInfo) => {
        this.breadcrumbs = [];
        this.fragments = this.currentNavigatedUrl.split('/');
        //* Consume the empty path
        this.fragments.shift();

        const moduleFragmentIndex = this.allBreadcrumbs.findIndex(
          (breadcrumb) => breadcrumb.route === this.fragments[0]
        );
        if (moduleFragmentIndex !== -1) {
          this.currentBreadcrumb = JSON.parse(
            JSON.stringify(this.allBreadcrumbs[moduleFragmentIndex])
          );
          this.breadcrumbs.push(this.currentBreadcrumb);
          this.fragments.shift();

          while (this.fragments.length > 0) {
            const isDetails = this.checkForDetailBreadcrumb(
              this.currentBreadcrumb.breadcrumbs,
              pageInfo
            );

            if (!isDetails) {
              const moduleBreadcrumb = this.currentBreadcrumb.breadcrumbs.find(
                (breadcrumb) => breadcrumb.route === this.fragments[0]
              );
              if (moduleBreadcrumb === undefined) {
                this.fragments.shift();
                continue;
              }
              if (moduleBreadcrumb.wildCards) {
                moduleBreadcrumb.wildCards.forEach((el) => {
                  moduleBreadcrumb.absoluteRoute =
                    moduleBreadcrumb.absoluteRoute.replace(
                      el,
                      this.allWildCards.get(el)
                    );
                });
              }

              this.breadcrumbs.push(moduleBreadcrumb);
              this.currentBreadcrumb = { ...moduleBreadcrumb };
              //* Consume the  fragment
              this.fragments.shift();
            }
          }
          this.breadcrumbs.shift();
        }
      })
    );
  }
  private checkForDetailBreadcrumb(
    moduleBreadcrumbs: Breadcrumb[],
    pageInfos: PageInfo[]
  ): boolean {
    if (moduleBreadcrumbs.length === 0) {
      return false;
    }
    const moduleFragmentIndex = moduleBreadcrumbs.findIndex(
      (breadcrumb) => breadcrumb.route === this.fragments[0]
    );

    if (moduleFragmentIndex === -1) {
      const detailBreadcrumb = moduleBreadcrumbs[0];

      const currentWildCard = detailBreadcrumb.wildCards.shift();
      const pieceInfo = pageInfos.find(
        (pageInfo) => pageInfo.wildCard === currentWildCard
      );
      if (currentWildCard) {
        this.allWildCards.set(currentWildCard, this.fragments[0]);
        detailBreadcrumb.absoluteRoute = detailBreadcrumb.absoluteRoute.replace(
          currentWildCard,
          this.fragments[0]
        );
      }
      detailBreadcrumb.subTitle = !!pieceInfo.viewId
        ? pieceInfo.viewId
        : this.fragments[0];

      this.fragments.shift();
      moduleBreadcrumbs.shift();

      //* Details module push
      this.breadcrumbs.push(detailBreadcrumb);
      this.currentBreadcrumb = detailBreadcrumb;
      return true;
    }
    return false;
  }

  public navigateBack() {
    this.breadcrumbService.updatePage(null);
  }

  public routeTo(route: string, type?: BreadcrumbType): void {
    if (type === BreadcrumbType.Static) {
      this.router.navigate([route]);
    }

    this.breadcrumbService.updatePage({ route });
  }
}
