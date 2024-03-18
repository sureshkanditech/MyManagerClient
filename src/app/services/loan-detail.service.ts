import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BASE_URL } from '../environment/environment';
import { LoanDetail } from '../interfaces/loan-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class LoanDetailService {
  public baseUrl: String = BASE_URL;

  constructor(private http: HttpClient) {}

  createNewLoanDetail(
    loanDetail: LoanDetail,
    createdBy: number
  ): Observable<LoanDetail[]> {
    const url = `${this.baseUrl}/LoanDetails`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post<LoanDetail>(url, loanDetail, httpOptions).pipe(
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
