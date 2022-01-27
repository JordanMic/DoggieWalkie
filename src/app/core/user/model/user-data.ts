export interface UserData {
  token: string;
  username: string;
  roles?: string[];
  userData?: UserDataAdditional;
  userBaseId: number;
  reason: string;
  timestamp: Date;
}

export interface UserDataAdditional {
  firstName: string;
  lastName: string;
  avatar?: Blob;
  town: LocationDataAdditional;
  district: LocationDataAdditional;
  voivodeship: LocationDataAdditional;
  listOfDogs: number;
  request: boolean;
  userProfileId: number;
}

export interface LocationDataAdditional{
  id: number;
  name: string;
}


