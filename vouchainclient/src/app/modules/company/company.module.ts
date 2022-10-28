/* Default Imports */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/* Components Imports */
import { CpyDashboardComponent } from './components/cpy-dashboard/cpy-dashboard.component';
import { CpyEmployeesComponent } from './components/cpy-employees/cpy-employees.component';
import { CpyLoginComponent } from './components/cpy-login/cpy-login.component';
import { CpyModifyProfileComponent } from './components/cpy-modify-profile/cpy-modify-profile.component';
import { CpyNavbarComponent } from './components/cpy-navbar/cpy-navbar.component';
import { CpyOrdersComponent } from './components/cpy-orders/cpy-orders.component';
import { CpyOverviewComponent } from './components/cpy-overview/cpy-overview.component';
import { CpySignupComponent } from './components/cpy-signup/cpy-signup.component';
import { CpyTransactionsComponent } from './components/cpy-transactions/cpy-transactions.component';
import { CpyUploadContractComponent } from './components/cpy-upload-contract/cpy-upload-contract.component';
import { CpyVouchersComponent } from './components/cpy-vouchers/cpy-vouchers.component';
import { CpyWalletComponent } from './components/cpy-wallet/cpy-wallet.component';

/* Modules Imports */
import { CompanyRoutingModule } from './company-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CpyDashboardComponent,
    CpyEmployeesComponent,
    CpyLoginComponent,
    CpyModifyProfileComponent,
    CpyNavbarComponent,
    CpyOrdersComponent,
    CpyOverviewComponent,
    CpySignupComponent,
    CpyTransactionsComponent,
    CpyUploadContractComponent,
    CpyVouchersComponent,
    CpyWalletComponent,
  ],
  imports: [CommonModule, CompanyRoutingModule, SharedModule],
})
export class CompanyModule {}
