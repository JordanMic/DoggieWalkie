import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from '../../user/service/user.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let userData = this.userService.getUserData();
    if (userData !== undefined) {
      request = request.clone({
        setHeaders: {
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
          'Authorization': `Bearer ${userData?.token}`,
        },
      })
    }

    return next.handle(request);
  }
}
