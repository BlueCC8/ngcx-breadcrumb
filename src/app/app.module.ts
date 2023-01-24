import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgcxBreadcrumbModule } from 'ngcx-breadcrumb';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportListComponent } from './reports-list/reports-list.component';
import { OrderListDetailsComponent } from './order/order-list-details/order-list-details.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { TransportInformationComponent } from './transport-information/transport-information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehicleInformationComponent } from './vehicle-information/vehicle-information.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportListComponent,
    DashboardComponent,
    OrderListComponent,
    OrderListDetailsComponent,
    TransportInformationComponent,
    VehicleInformationComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgcxBreadcrumbModule.forRoot(),
    BrowserAnimationsModule,
  ],
})
export class AppModule {}
