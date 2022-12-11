import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FreightExchangeComponent } from './freight-exchange/freight-exchange.component';
import { OrderListDetailsComponent } from './order/order-list-details/order-list-details.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { TransportInformationComponent } from './transport-information/transport-information.component';
import { VehicleInformationComponent } from './vehicle-information/vehicle-information.component';

const routes: Routes = [
  {
    path: 'secure',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'freight-exchange',
        component: FreightExchangeComponent,
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
