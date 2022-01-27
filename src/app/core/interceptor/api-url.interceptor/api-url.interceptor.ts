import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let apiUrl = environment.apiPath;

    if (request.url.includes('http')) {
      return next.handle(request);
    } else {
      if (!request.url.includes('http')) {
        if (request.url[0] !== '/') {
          apiUrl += '/';
        }

        request = request.clone({
          url: apiUrl + request.url
        });
      }

      return next.handle(request);
    }
  }
}
