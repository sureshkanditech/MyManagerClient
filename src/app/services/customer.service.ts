import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CustomerGroup } from '../interfaces/customer-group.interface';
import { Customer } from '../interfaces/customer.interface';
import { CustomerGroupDto } from '../interfaces/customer-group-dto.interface';
import { CustomerDto } from '../interfaces/customer-dto.interface';
import { BASE_URL } from '../environment/environment';
import {
  FullDetailsCustomerGroupToCustomerMapDTO,
  FullDetailsDto,
} from '../interfaces/full-details-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public baseUrl: String = BASE_URL;

  constructor(private http: HttpClient) {}

  AddCustomer(
    CustomerGroupToCustomerMapDTO: FullDetailsCustomerGroupToCustomerMapDTO
  ): Observable<FullDetailsDto> {
    const url = `${this.baseUrl}/Customers/CreateCustomer`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post<FullDetailsDto>(url, CustomerGroupToCustomerMapDTO, httpOptions)
      .pipe(
        map((response: FullDetailsDto) => {
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

  getCustomers(): Observable<CustomerGroup[]> {
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

  getCustomersByAadhaar(aadhaar: string): Observable<CustomerDto> {
    const url = `${this.baseUrl}/Customers/SearchCustomerByAadhaar`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams().append('aadhaar', aadhaar.toString()),
    };

    return this.http.get<CustomerDto>(url, httpOptions).pipe(
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
