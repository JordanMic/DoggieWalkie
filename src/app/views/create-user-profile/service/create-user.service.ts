import {CreateUserProfileModel} from '../model/create-user-profile-model';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../core/user/service/user.service';
import {Injectable} from '@angular/core';

@Injectable()
export class CreateUserService {
  private createModel: CreateUserProfileModel;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this.createModel = {}
  }

  getModel(): CreateUserProfileModel {
    return this.createModel;
  }

  createProfile(): Promise<any> {
     return this.httpClient.post<void>('/user/profile', this.createModel).toPromise()
       .then(() => {
         this.userService.updateUserData();
       });
  }

  updateModel(value: CreateUserProfileModel) {
    this.createModel = {...this.createModel, ...value}
  }
}
