import { Injectable } from '@angular/core';
import { BASE_URL } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoanCollectionDetail } from '../interfaces/loan-collection-detail-dto.interface';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FullDetailsDto } from '../interfaces/full-details-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class LoanCollectionDetailService {
  public baseUrl: String = BASE_URL;

  constructor(private http: HttpClient) {}

  addInstallment(
    loanCollectionDetail: LoanCollectionDetail
  ): Observable<FullDetailsDto> {
    const url = `${this.baseUrl}/LoanCollectionDetails`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post<FullDetailsDto>(url, loanCollectionDetail, httpOptions)
      .pipe(
        map((response: any) => {
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
