import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CustomerGroup } from '../interfaces/customer-group.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public baseUrl: String = 'BASE_URL';

  constructor(private http: HttpClient) {}

  AddCustomerGroup(customerGroup: CustomerGroup): Observable<boolean> {
    const url = `${this.baseUrl}/CustomerGroups`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post<CustomerGroup>(url, customerGroup, httpOptions).pipe(
      map((response: any) => {
        console.log(response);
        return true;
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

  getCustomerGroups(): Observable<CustomerGroup[]> {
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
