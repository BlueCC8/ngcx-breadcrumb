import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgcxBreadcrumbService } from './ngcx-breadcrumb.service';
import { NgcxBreadcrumbComponent } from './ngcx-breadcrumb/ngcx-breadcrumb.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [NgcxBreadcrumbComponent],
  imports: [CommonModule, MatIconModule],
  exports: [NgcxBreadcrumbComponent],
})
export class NgcxBreadcrumbModule {
  static forRoot(): ModuleWithProviders<NgcxBreadcrumbModule> {
    return {
      ngModule: NgcxBreadcrumbModule,
      providers: [{ provide: NgcxBreadcrumbService }],
    };
  }
}
