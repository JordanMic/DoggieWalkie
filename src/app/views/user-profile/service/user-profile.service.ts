import { Injectable } from '@angular/core';
import {UserProfileModel} from '../model/user-profile-model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../core/user/service/user.service';
import {Router} from '@angular/router';
import {apiErrorHandler} from '../../../services/api/helpers/api-error-handler';
import {UserProfileOpinionModel} from "../model/user-profile-opinion-model";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private userProfile: UserProfileModel;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) { }

  getModel(): UserProfileModel{
    return this.userProfile;
  }

  async viewProfile(userID: number): Promise<UserProfileModel> {
    try {
      return await this.httpClient.get<UserProfileModel>('/user/profile/view/' + userID).toPromise();
    } catch (error) {
      apiErrorHandler(error as HttpErrorResponse, this.router, this.userService);
      throw error;
    }
  }

  viewOpinion(userID: number): Promise<UserProfileOpinionModel[]> {
    try {
      return this.httpClient.get<UserProfileOpinionModel[]>('/user/profile/view/opinions/' + userID).toPromise();
    } catch (error) {
      apiErrorHandler(error as HttpErrorResponse, this.router, this.userService);
      throw error;
    }
  }
}
