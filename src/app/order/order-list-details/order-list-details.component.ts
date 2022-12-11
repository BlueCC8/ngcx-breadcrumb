import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgcxBreadcrumbService } from 'ngcx-breadcrumb';
import { PageUpdate } from 'ngcx-breadcrumb/lib/models/page-update';

@Component({
  templateUrl: './order-list-details.component.html',
  styleUrls: ['./order-list-details.component.scss'],
})
export class OrderListDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private breadcrumbService: NgcxBreadcrumbService,
    private location: Location,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    const pageInfo = [
      {
        id: null,
        wildCard: 'id',
      },
    ];
    this.breadcrumbService.updatePageInfo(pageInfo);
  }

  ngOnInit(): void {
    const pageInfo = [
      {
        id: '1',
        wildCard: 'id',
      },
    ];
    this.breadcrumbService.updatePageInfo(pageInfo);

    this.breadcrumbService.pageChangeSubject$.subscribe((page) => {
      if (page === null) {
        this.navigateBack();
      } else {
        this.routeTo(page);
      }
    });
  }
  public navigateBack() {
    this.location.back();
  }
  public routeTo(update: PageUpdate): void {
    this.router.navigate([update.route]);
  }
}
