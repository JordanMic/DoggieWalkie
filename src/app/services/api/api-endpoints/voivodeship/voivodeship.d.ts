import { TownModel } from "src/app/models/town-model";

export interface IVoivodeshipMethods {
  voivodeship: VoivodeshipEndpointFunction;
  district: DistrictEndpointFunction;
  town: TownEndpointFunction;
  allTown: TownSearchEndpointFunction;
}

export type VoivodeshipEndpointFunction = () => Promise<VoivodeshipResponse>
export type DistrictEndpointFunction = (voivodeshipId: number) => Promise<DistrictResponse>
export type TownEndpointFunction = (voivodeshipId: number, districtId: number) => Promise<TownResponse>
export type TownSearchEndpointFunction = (townName: string) => Promise<TownResponse>



export type VoivodeshipResponse  = IVoivodeship[];
export type DistrictResponse  = IDistrict[];
export type TownResponse  = ITown[];

export interface IVoivodeship {
  id: number;
  name: string;
}

export interface IDistrict {
  id: number;
  name: string;
}

export interface ITown {
  id: number;
  name: string;
  districtName: string;
  voivodeshipName: string;
}
