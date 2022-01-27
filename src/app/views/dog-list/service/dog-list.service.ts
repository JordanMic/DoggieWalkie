import { Injectable } from '@angular/core';
import {DogListModel, DogListProfilesModel} from '../model/dog-list-model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../core/user/service/user.service';

import {apiErrorHandler} from '../../../services/api/helpers/api-error-handler';
import {Router} from '@angular/router';
import {DogSearchModel} from '../model/dog-search-model';

@Injectable({
  providedIn: 'root'
})
export class DogListService {
  private dogLstModel: DogListModel;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  getModel(): DogListModel{
    return this.dogLstModel;
  }

  dogList(dogSearchData: DogSearchModel): Promise<DogListModel> {
    try {
      return this.httpClient.post<DogListModel>('/dog/search', (dogSearchData)).toPromise();
    } catch (error) {
      apiErrorHandler(error as HttpErrorResponse, this.router, this.userService);
      throw new Error();
    }
  }

// tslint:disable-next-line:typedef
  updateModel(value: DogListModel){
      this.dogLstModel = {...this.dogLstModel, ...value};
  }

  updateFavorite(id: number, status: boolean) {
    if (status) {
      this.httpClient.post('/dog/favorite/' + id, {}).toPromise();
    } else {
      this.httpClient.delete('/dog/favorite/' + id, {}).toPromise();
    }
  }
}
