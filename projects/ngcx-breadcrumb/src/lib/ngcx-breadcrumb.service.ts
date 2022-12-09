import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PageInfo } from './models/page-info';
import { PageUpdate } from './models/page-update';

@Injectable({ providedIn: 'root' })
export class NgcxBreadcrumbService {
  private pageInfoSubject = new Subject<PageInfo>();
  public pageInfoSubject$ = this.pageInfoSubject.asObservable();

  private pageChangeSubject = new Subject<PageUpdate>();
  public pageChangeSubject$ = this.pageChangeSubject.asObservable();

  public updatePageInfo(pageInfo: PageInfo) {
    this.pageInfoSubject.next(pageInfo);
  }

  public updatePage(update: PageUpdate) {
    this.pageChangeSubject.next(update);
  }
}
