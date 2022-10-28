/* --- DEFAULTS IMPORTS --- */
import { Component, OnInit } from '@angular/core';

/* vvv CUSTOM IMPORTS vvv */
//#region

/* Environment */
import { environment } from 'src/environments/environment';

/* jQuery */
declare var $: any;

/* Locales */
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';

/* Models */
import { CompanyDTO } from 'src/app/model/company-dto';
import { TransactionDTO } from 'src/app/model/transaction-dto';
import { VoucherDTO } from 'src/app/model/voucher-dto';

/* Services */
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CpyShowProfileService } from '../../services/rest/cpy-show-profile.service';
import { CpyVouchersService } from '../../services/rest/cpy-vouchers.service';
import { EmpShowProfileService } from 'src/app/modules/employee/services/rest/emp-show-profile.service';
import { TransactionRequestDTO } from 'src/app/model/transaction-request-dto';
import { TransactionsService } from 'src/app/services/rest/transactions.service';
import { TranslateService } from '@ngx-translate/core';
import { ValidatorService } from 'src/app/services/validator.service';

//#endregion
/* ^^^ CUSTOM IMPORTS ^^^ */

@Component({
  selector: 'app-cpy-overview',
  templateUrl: './cpy-overview.component.html',
  styleUrls: ['./cpy-overview.component.css'],
})
export class CpyOverviewComponent implements OnInit {
  /* vvv ATTRIBUTES vvv */
  //#region

  /* Messages */
  activeTableBodyMessage: string;
  transactionsTableBodyMessage: string;

  /* Models */
  activeVouchers: VoucherDTO[] = new Array();
  cpyDto: CompanyDTO = new CompanyDTO();
  transactions: TransactionDTO[];

  /* Statuses */
  activeTableEmpty: boolean = false;
  activeTableError: boolean = false;
  activeTableLoading: boolean = false;
  transactionsTableEmpty: boolean = false;
  transactionsTableError: boolean = false;
  transactionsTableLoading: boolean = false;

  /* Values */
  endDateString: string;
  startDateString: string;
  totalActiveImport: number;

  //#endregion
  /* ^^^ ATTRIBUTES ^^^ */

  constructor(
    private authenticatorService: AuthenticationService,
    private cpyVouchersService: CpyVouchersService,
    private empProfileService: EmpShowProfileService,
    private showProfileService: CpyShowProfileService,
    private transactionsService: TransactionsService,
    private translatorService: TranslateService,
    public validatorService: ValidatorService
  ) {
    /* Add Italian locale, used to format currency and date (default is 'en-US') */
    registerLocaleData(localeIt, 'it-IT');
  }

  ngOnInit(): void {
    this.showProfileService.getShowProfile().subscribe((response) => {
      this.cpyDto = response;
    });

    this.getRangeLastMonth();
    this.showActiveVouchers();
    this.showTransactionsList();
  }

  /* vvv METHODS vvv */

  /* Calculate the active total import */
  calculateTotalActiveImport() {
    this.totalActiveImport = 0;

    this.activeVouchers.forEach((vch) => {
      this.totalActiveImport += Number(vch.vchValue) * Number(vch.vchQuantity);
    });
  }

  /* Create a Transaction Request DTO to get list of transaction in specific time period */
  createTransactioRequestDTO(): TransactionRequestDTO {
    const trcRequestDTO: TransactionRequestDTO = new TransactionRequestDTO();

    trcRequestDTO.startDate = this.startDateString;
    trcRequestDTO.endDate = this.endDateString;
    trcRequestDTO.usrId = this.authenticatorService.getLoggedUserId();
    trcRequestDTO.profile = 'company';

    return trcRequestDTO;
  }

  getRangeLastMonth() {
    let todayDate = new Date();

    this.endDateString =
      todayDate.getFullYear() +
      '-' +
      (todayDate.getMonth() + 1) +
      '-' +
      todayDate.getDate();

    todayDate.setDate(todayDate.getDate() - 30);

    this.startDateString =
      todayDate.getFullYear() +
      '-' +
      (todayDate.getMonth() + 1) +
      '-' +
      todayDate.getDate();
  }

  getTrcTypeFullDescription(trcType: string) {
    switch (trcType) {
      case 'ACV': {
        return 'Acquisto di buoni';
      }
      case 'ALL': {
        return 'Trasferimento di buoni verso ';
      }
      default: {
        return 'Tipologia di transazione generica';
      }
    }
  }

  /* Fill the active vouchers table */
  showActiveVouchers() {
    /* Show loading spinner */
    this.activeTableLoading = true;

    /* Get purchasable vouchers list from rest service */
    this.cpyVouchersService.showActiveVouchers().subscribe(
      (response) => {
        /* Hide loading spinner */
        this.activeTableLoading = false;

        if (response.status === 'OK') {
          /* Assign response list to an array of VouchersDTO */
          this.activeVouchers = [...response.list];

          /* Check whether array is empty or not */
          if (
            !Array.isArray(this.activeVouchers) ||
            !this.activeVouchers.length
          ) {
            /* Show empty list message in table body */
            this.activeTableBodyMessage = this.translatorService.instant(
              'TABLES.VOUCHERS.EMPTY_TABLE'
            );

            this.activeTableEmpty = true;
          } else {
            this.activeTableEmpty = false;

            this.calculateTotalActiveImport();

            this.activeVouchers.splice(4);
          }
        } else {
          /* Show error message in active vouchers table body in case of no specific HTTP error ('Generic Error') */
          this.activeTableBodyMessage = this.translatorService.instant(
            'ERRORS.GENERIC'
          );

          this.activeTableLoading = false;
          this.activeTableEmpty = true;
          this.activeTableError = true;
        }
      },
      (error) => {
        /* Show error message in active vouchers table body in case of no specific HTTP error ('Generic Error') */
        this.activeTableBodyMessage = this.translatorService.instant(
          'ERRORS.GENERIC'
        );

        this.activeTableLoading = false;
        this.activeTableEmpty = true;
        this.activeTableError = true;
      }
    );
  }

  showTransactionsList() {
    /* Empty transactions list */
    if (Array.isArray(this.transactions) && this.transactions.length) {
      this.transactions = [];
    }

    /* Show loading spinner */
    this.transactionsTableLoading = true;

    /* Reset table satus */
    this.transactionsTableEmpty = false;

    /* Get transactions list from rest service */
    this.transactionsService
      .showTransactionsList(this.createTransactioRequestDTO())
      .subscribe(
        (response) => {
          /* Hide loading spinner */
          this.transactionsTableLoading = false;

          if (response.status === 'OK') {
            /* Assign response list to an array of EmployeesDTO */
            this.transactions = [...response.list];

            /* Check whether array is empty or not */
            if (
              !Array.isArray(this.transactions) ||
              !this.transactions.length
            ) {
              /* Show empty list message in table body */
              this.transactionsTableBodyMessage = this.translatorService.instant(
                'Nessuna transazione trovata'
              );

              this.transactionsTableEmpty = true;
            } else {
              this.transactionsTableEmpty = false;

              this.transactions.splice(4);
            }
          } else {
            /* Show error message in table body in case of no specific error ('Generic Error') */
            this.transactionsTableBodyMessage = this.translatorService.instant(
              'ERRORS.GENERIC'
            );

            this.transactionsTableLoading = false;
            this.transactionsTableEmpty = true;
            this.transactionsTableError = true;
          }
        },
        (error) => {
          /* Show error message in table body in case of no specific HTTP error ('Generic Error') */
          this.transactionsTableBodyMessage = this.translatorService.instant(
            'ERRORS.GENERIC'
          );

          this.transactionsTableLoading = false;
          this.transactionsTableEmpty = true;
          this.transactionsTableError = true;
        }
      );
  }

  /* ^^^ METHODS ^^^ */
}
