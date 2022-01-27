import { HttpClient } from '@angular/common/http';
import {IAuthMethods, ILoginResponse, ILoginData, INewRegisterData} from './auth.d';

export const auth = (httpClient: HttpClient): IAuthMethods => ({
  login: async (loginData: ILoginData) => {
    try {
      const response =  await httpClient.post<ILoginResponse>('/auth/login', loginData).toPromise();
      window.localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  register: (newRegisterData: INewRegisterData) => {
    try {
      return httpClient.post<void>('/auth/register', newRegisterData).toPromise();
    }catch (error) {
      console.log(error);
      throw error;
    }
  }
});
