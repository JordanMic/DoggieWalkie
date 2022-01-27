import { Injectable } from '@angular/core';
import {LoginModel} from '../model/login-model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../core/user/service/user.service';
import {map} from 'rxjs/operators';
import {UserData} from '../../../core/user/model/user-data';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  login(loginModel: LoginModel): Observable<any> {
    return this.http.post<UserData>('/auth/login', loginModel)
      .pipe(
        map(value => {
          this.userService.reportUser(value);
          return value;
        })
      );
  }
}
