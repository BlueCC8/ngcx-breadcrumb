import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportListComponent } from './reports-list/reports-list.component';
import { OrderListDetailsComponent } from './order/order-list-details/order-list-details.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { TransportInformationComponent } from './transport-information/transport-information.component';
import { VehicleInformationComponent } from './vehicle-information/vehicle-information.component';

const routes: Routes = [
  {
    path: 'main',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'reports-list',
        component: ReportListComponent,
      },
      {
        path: 'order-list',
        children: [
          {
            path: '',
            component: OrderListComponent,
          },
          { path: ':id', component: OrderListDetailsComponent },
          {
            path: ':id/transport',
            children: [
              {
                path: '',
                component: TransportInformationComponent,
              },
              { path: ':vehicleId', component: VehicleInformationComponent },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
