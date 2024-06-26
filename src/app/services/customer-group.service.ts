import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CustomerGroup } from '../interfaces/customer-group.interface';
import { BASE_URL } from '../environment/environment';
import { CustomerGroupDto } from '../interfaces/customer-group-dto.interface';
import { FullDetailsDto } from '../interfaces/full-details-dto.interface';
import { TransactionsDTO } from '../interfaces/transaction-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerGroupService {
  public baseUrl: String = BASE_URL;

  constructor(private http: HttpClient) {}

  AddCustomerGroup(
    customerGroup: CustomerGroupDto,
    createdBy: number
  ): Observable<FullDetailsDto> {
    const url = `${this.baseUrl}/CustomerGroups`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post<CustomerGroup>(
        url,
        {
          CustomerGroupName: customerGroup.CustomerGroupName,
          CustomerGroupLocation: customerGroup.CustomerGroupLocation,
          CreatedBy: createdBy,
        },
        httpOptions
      )
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        }),
        catchError((err: { error: { message: any } }) => {
          // Handle different types of errors appropriately
          console.error(err);
          if (err.error && err.error.message) {
            return throwError(() => err.error.message);
          } else {
            return throwError(() => 'An unknown error occurred during login.');
          }
        })
      );
  }

  getFullDetailsDtos(): Observable<FullDetailsDto> {
    const url = `${this.baseUrl}/CustomerGroups/GetAllResults`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.get<FullDetailsDto>(url, httpOptions).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((err: { error: { message: any } }) => {
        // Handle different types of errors appropriately
        console.error(err);
        if (err.error && err.error.message) {
          return throwError(() => err.error.message);
        } else {
          return throwError(() => 'An unknown error occurred during login.');
        }
      })
    );
  }

  getTodaysTransactions(): Observable<TransactionsDTO[][]> {
    const url = `${this.baseUrl}/CustomerGroups/GetTodaysTransactions`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.get<TransactionsDTO[][]>(url, httpOptions).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((err: { error: { message: any } }) => {
        // Handle different types of errors appropriately
        console.error(err);
        if (err.error && err.error.message) {
          return throwError(() => err.error.message);
        } else {
          return throwError(() => 'An unknown error occurred during login.');
        }
      })
    );
  }

  getCustomerGroups(): Observable<CustomerGroupDto[]> {
    const url = `${this.baseUrl}/CustomerGroups`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.get<CustomerGroup[]>(url, httpOptions).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((err: { error: { message: any } }) => {
        // Handle different types of errors appropriately
        console.error(err);
        if (err.error && err.error.message) {
          return throwError(() => err.error.message);
        } else {
          return throwError(() => 'An unknown error occurred during login.');
        }
      })
    );
  }
}
