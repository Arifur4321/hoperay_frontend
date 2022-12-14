/* Default Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components Imports */
import { EmpDashboardComponent } from './components/emp-dashboard/emp-dashboard.component';
import { EmpInvitationcodeComponent } from './components/emp-invitationcode/emp-invitationcode.component';
import { EmpLoginComponent } from './components/emp-login/emp-login.component';
import { EmpMerchantsComponent } from './components/emp-merchants/emp-merchants.component';
import { EmpModifyProfileComponent } from './components/emp-modify-profile/emp-modify-profile.component';
import { EmpOverviewComponent } from './components/emp-overview/emp-overview.component';
import { EmpSignupComponent } from './components/emp-signup/emp-signup.component';
import { EmpTransactionsComponent } from './components/emp-transactions/emp-transactions.component';
import { EmpVouchersComponent } from './components/emp-vouchers/emp-vouchers.component';
import { EmpWalletComponent } from './components/emp-wallet/emp-wallet.component';

/* Services */
import { RouteGuardService } from 'src/app/services/route-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/employee/empLogin', pathMatch: 'full' },
  { path: 'empInvitationCode', component: EmpInvitationcodeComponent },
  { path: 'empLogin', component: EmpLoginComponent },
  { path: 'empSignup', component: EmpSignupComponent },
  {
    path: 'empDashboard',
    component: EmpDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: '/employee/empDashboard/overview',
        pathMatch: 'full',
      },
      {
        path: 'merchants',
        component: EmpMerchantsComponent,
        canActivate: [RouteGuardService],
        data: { roles: ['employee'] },
      },
      {
        path: 'modifyProfile',
        component: EmpModifyProfileComponent,
        canActivate: [RouteGuardService],
        data: { roles: ['employee'] },
      },
      {
        path: 'overview',
        component: EmpOverviewComponent,
        canActivate: [RouteGuardService],
        data: { roles: ['employee'] },
      },
      {
        path: 'transactions',
        component: EmpTransactionsComponent,
        canActivate: [RouteGuardService],
        data: { roles: ['employee'] },
      },
      {
        path: 'vouchers',
        component: EmpVouchersComponent,
        canActivate: [RouteGuardService],
        data: { roles: ['employee'] },
      },
      {
        path: 'wallet',
        component: EmpWalletComponent,
        canActivate: [RouteGuardService],
        data: { roles: ['employee'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
