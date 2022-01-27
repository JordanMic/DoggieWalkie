// @ts-ignore
import {IDogMethods, IGetDogsConfig} from './dog.d';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import {apiErrorHandler} from '../../helpers/api-error-handler';
import {ICreateDogProfile} from '../../../../models/create-dog-profile-model';
import {UserService} from '../../../../core/user/service/user.service';


export const dogControler = (httpClient: HttpClient, router: Router, userService: UserService): IDogMethods => ({
  createDog: async (dog: ICreateDogProfile) => {
    try {
      return await httpClient.post<void>('/dog', JSON.stringify(dog), {withCredentials: true}  ).toPromise();
    } catch (error) {
      apiErrorHandler(error as HttpErrorResponse, router, userService);
    }
  },

});
