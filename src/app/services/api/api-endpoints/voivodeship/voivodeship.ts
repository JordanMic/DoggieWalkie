import { DistrictResponse, IVoivodeshipMethods, TownResponse, VoivodeshipResponse } from './voivodeship.d';
import { HttpClient } from '@angular/common/http';
import {TownModel} from '../../../../models/town-model';


export const voivodeship = (httpClient: HttpClient): IVoivodeshipMethods => ({
  voivodeship: async () => {
    try {
      return await httpClient.get<VoivodeshipResponse>('/voivodeship').toPromise();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  district: async (voivodeshipId: number) => {
    try {
      return await httpClient.get<DistrictResponse>('/voivodeship/' + voivodeshipId).toPromise();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  town: async (voivodeshipId: number, districtId: number) => {
    try {
      // tslint:disable-next-line:max-line-length
      return await httpClient.get<TownResponse>('/voivodeship/' + voivodeshipId + '/district/' + districtId).toPromise();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  allTown: async (townName: string) => {
    try {
      // tslint:disable-next-line:max-line-length
      return await httpClient.get<TownResponse>('/search/town/' + townName).toPromise();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
});


