import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../core/user/service/user.service';
import {apiErrorHandler} from '../../../services/api/helpers/api-error-handler';
import {Router} from '@angular/router';
import {MyPackModel} from '../model/my-pack-model';

@Injectable({
  providedIn: 'root'
})
export class MyPackService {
  private myPackList: MyPackModel;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) { }

  getModel(): MyPackModel{
    return this.myPackList;
  }

  myPackView(): Promise<MyPackModel> {
    try {
      return this.httpClient.get<MyPackModel>('/dog/user/manage').toPromise();
    } catch (error) {
      apiErrorHandler(error as HttpErrorResponse, this.router, this.userService);
      throw new Error();
    }
  }

  // tslint:disable-next-line:typedef
  updateModel(value: MyPackModel){
    this.myPackList = {...this.myPackList, ...value};
  }

}
