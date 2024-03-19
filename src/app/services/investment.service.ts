import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BASE_URL } from '../environment/environment';
import { LoanDetail } from '../interfaces/loan-detail.interface';
import { InvestmentDto } from '../interfaces/investment-dto';
import { InvestmentMasterDto } from '../interfaces/investment-master-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  public baseUrl: String = BASE_URL;

  constructor(private http: HttpClient) {}

  addInvestment(investmentDto: InvestmentDto): Observable<InvestmentDto[]> {
    const url = `${this.baseUrl}/InvestmentDeposits/AddInvestment`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post<InvestmentDto[]>(url, investmentDto, httpOptions)
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

  GetInvestments(): Observable<InvestmentMasterDto[]> {
    const url = `${this.baseUrl}/InvestmentMasters`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.get<InvestmentMasterDto[]>(url, httpOptions).pipe(
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
