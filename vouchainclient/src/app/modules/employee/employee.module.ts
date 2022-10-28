/* Default Imports */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/* Modules Imports */
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';

/* Components Imports */
import { EmpDashboardComponent } from './components/emp-dashboard/emp-dashboard.component';
import { EmpInvitationcodeComponent } from './components/emp-invitationcode/emp-invitationcode.component';
import { EmpLoginComponent } from './components/emp-login/emp-login.component';
import { EmpMerchantsComponent } from './components/emp-merchants/emp-merchants.component';
import { EmpModifyProfileComponent } from './components/emp-modify-profile/emp-modify-profile.component';
import { EmpNavbarComponent } from './components/emp-navbar/emp-navbar.component';
import { EmpOverviewComponent } from './components/emp-overview/emp-overview.component';
import { EmpSignupComponent } from './components/emp-signup/emp-signup.component';
import { EmpTransactionsComponent } from './components/emp-transactions/emp-transactions.component';
import { EmpVouchersComponent } from './components/emp-vouchers/emp-vouchers.component';
import { EmpWalletComponent } from './components/emp-wallet/emp-wallet.component';

@NgModule({
  declarations: [
    EmpDashboardComponent,
    EmpInvitationcodeComponent,
    EmpLoginComponent,
    EmpMerchantsComponent,
    EmpModifyProfileComponent,
    EmpNavbarComponent,
    EmpOverviewComponent,
    EmpSignupComponent,
    EmpTransactionsComponent,
    EmpVouchersComponent,
    EmpWalletComponent,
  ],
  imports: [CommonModule, EmployeeRoutingModule, SharedModule],
})
export class EmployeeModule {}
