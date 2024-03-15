import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupComponent } from './group.component';
import { CustomerComponent } from './customer.component';
import { InvestmentComponent } from './investment.component';
import { LoanDetailsComponent } from './loan-details.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customer',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'group',
      },
      {
        path: 'group',
        component: GroupComponent,
        data: {
          title: 'Group Details',
        },
      },
      {
        path: 'loan-details',
        component: LoanDetailsComponent,
        data: {
          title: 'Loan Details',
        },
      },
      {
        path: 'customer',
        component: CustomerComponent,
        data: {
          title: 'Loan Details',
        },
      },
      {
        path: 'investment',
        component: InvestmentComponent,
        data: {
          title: 'Cash Investment',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
