import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import {UserService} from '../../user/service/user.service';

@Injectable()
export class RedirectInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private userService: UserService
  ){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 403 && err.status !== 401) {
            return;
          }
          this.userService.logout();
          this.router.navigate(['sign-in']);
        }
      })
    );
  }
}
