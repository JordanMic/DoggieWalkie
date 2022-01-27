import { IVoivodeshipMethods } from './api-endpoints/voivodeship/voivodeship.d';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISample } from '../../models/sample';
import { auth } from './api-endpoints/auth/auth';
import { IDogMethods } from './api-endpoints/dog/dog.d';
import { IAuthMethods } from './api-endpoints/auth/auth.d';
import { voivodeship } from './api-endpoints/voivodeship/voivodeship';
import { dogControler } from './api-endpoints/dog/dog';
import {ConfigService} from '../config/config.service';
import {UserService} from '../../core/user/service/user.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private router: Router, private config: ConfigService, private userService: UserService) {}

  auth: IAuthMethods  = auth(this.httpClient);
  voivodeship: IVoivodeshipMethods = voivodeship(this.httpClient);
  dog: IDogMethods = dogControler(this.httpClient, this.router, this.userService);

  getBasicData(): Promise<ISample> {
    return this.httpClient.get<ISample>(`/dogs`).toPromise();
  }

}


