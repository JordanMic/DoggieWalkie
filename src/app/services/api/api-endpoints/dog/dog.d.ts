import {ICreateDogProfile} from './../../../../models/create-dog-profile-model';

export interface IDogMethods{
  createDog: CreateDogEndpointFunction;

}

export type CreateDogEndpointFunction = (dog: ICreateDogProfile) => Promise<void>;

