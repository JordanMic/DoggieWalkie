import { IUser } from "./users/user";

export interface ISample{
  status: string;
  statuseCode: number;
  dogs: IDog[];
}

export interface IDog {
  id: string;
  name: string;
  status: string;
  imgUrl: string;
  available: boolean;
  description: string;
  age: number;
  ownerName: string;
  sterilised: boolean;
  gender: string;
  town: string;
  ownerId: number;
}
