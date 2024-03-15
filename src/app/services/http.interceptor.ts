import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  apiUrl: string = 'BASE_URL';

  constructor() {
    console.log('JwtInterceptor is called');
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('intercept is called');
    const currentUser = localStorage.getItem('LoggedInUser'); // this.authenticationService.currentUser;
    const isLoggedIn = !!currentUser;

    const isApiUrl = request.url.startsWith(this.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('currentUserToken')}`, //this.authenticationService.userToken}`
        },
      });
    }

    return next.handle(request);
  }
}
