import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BASE_URL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { AuthStatus, LoginResponse, User } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private readonly baseUrl: string = BASE_URL;
  private user = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  private setAuthentication(user: User, token: string): boolean {
    this.user.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('currentUserToken', token);
    localStorage.setItem('LoggedInUser', JSON.stringify(user));
    return true;
  }

  login(
    username: string,
    password: string,
    recordar: boolean = false
  ): Observable<boolean> {
    const url = `${this.baseUrl}/Users/Login`;
    // Remove token on login attempt
    // localStorage.removeItem('currentUserToken');

    if (recordar) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }

    return this.http
      .post<LoginResponse>(url, {
        username: username,
        password: password,
      })
      .pipe(
        map((response) => {
          const decode = response.token.split('.');
          const loggedinUserObject = JSON.parse(window.atob(decode[1]));
          this.setAuthentication(loggedinUserObject, response.token);
          return true;
        }),
        catchError((err) => {
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
