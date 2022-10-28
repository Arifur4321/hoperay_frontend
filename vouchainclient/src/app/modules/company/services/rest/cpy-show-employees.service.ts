/*  Default Imports */
import { Injectable } from '@angular/core';

/* Custom Imports */
import * as myGlobals from 'src/globals/globals';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DTOList } from 'src/app/model/dto-list';
import { EmployeeDTO } from 'src/app/model/employee-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CpyShowEmployeesService {
  private restShowEmployeesUrl: string;

  constructor(
    private authenticatorService: AuthenticationService,
    private httpClient: HttpClient
  ) {
    this.restShowEmployeesUrl = environment.basicUrl + myGlobals.empShowList;
  }

  showEmployeesList() {
    let headers = this.authenticatorService.getEmpHeader();

    return this.httpClient.get<DTOList<EmployeeDTO>>(
      this.restShowEmployeesUrl +
        '/' +
        this.authenticatorService.getLoggedUserId(),
      { headers }
    );
  }
}
