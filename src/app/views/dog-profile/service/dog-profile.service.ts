import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../core/user/service/user.service';
import {CreateUserProfileModel} from '../../create-user-profile/model/create-user-profile-model';
import {DogProfileModel} from '../model/dog-profile-model';
import {apiErrorHandler} from '../../../services/api/helpers/api-error-handler';
import {Route, Router} from '@angular/router';
import {DogWalksListModel} from "../model/dog-walks-list-model";
import {UserProfileOpinionModel} from "../../user-profile/model/user-profile-opinion-model";
import {DogProfileOpinionModel} from "../model/dog-profile-opinion-model";

@Injectable({
  providedIn: 'root'
})
export class DogProfileService {
  private dogProfile: DogProfileModel;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) { }

  getModel(): DogProfileModel {
    return this.dogProfile;
  }

  async viewDogProfile(dogID: number): Promise<DogProfileModel> {
    try {
      return await this.httpClient.get<DogProfileModel>('/dog/profile/view/' + dogID ).toPromise();
  } catch (error) {
      apiErrorHandler(error as HttpErrorResponse, this.router, this.userService);
      throw error;
  }
}

  viewOpinion(dogID: number): Promise<DogProfileOpinionModel[]> {
    try {
      return this.httpClient.get<DogProfileOpinionModel[]>('/dog/profile/view/opinions/' + dogID).toPromise();
    } catch (error) {
      apiErrorHandler(error as HttpErrorResponse, this.router, this.userService);
      throw error;
    }
  }

  dogWalksList(dogID: number): Promise<DogWalksListModel[]> {
    try {
      return this.httpClient.get<DogWalksListModel[]>('/request/dog/' + dogID ).toPromise();
    } catch (error) {
      apiErrorHandler(error as HttpErrorResponse, this.router, this.userService);
      throw error;
    }
  }
  // tslint:disable-next-line:typedef
  updateModel(value: CreateUserProfileModel) {
    this.dogProfile = {...this.dogProfile, ...value};
  }

}
