import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgcxBreadcrumbService } from 'ngcx-breadcrumb';
import { PageInfo } from 'projects/ngcx-breadcrumb/src/lib/models/page-info';
import { PageUpdate } from 'projects/ngcx-breadcrumb/src/lib/models/page-update';

@Component({
  templateUrl: './transport-information.component.html',
  styleUrls: ['./transport-information.component.scss'],
})
export class TransportInformationComponent implements OnInit, OnDestroy {
  constructor(
    private breadcrumbService: NgcxBreadcrumbService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pageInfo: PageInfo[] = [
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
  ngOnDestroy(): void {
    const pageInfo: PageInfo[] = [
      {
        id: null,
        wildCard: 'id',
      },
    ];
    this.breadcrumbService.updatePageInfo(pageInfo);
  }
}
