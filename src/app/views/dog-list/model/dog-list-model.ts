export interface DogListModel {
  quantity: number;
  profilesListModels: DogListProfilesModel[];
}

export interface DogListProfilesModel {
  id: number;
  dogName: string;
  status: string;
  town: string;
  avatar?: Blob;
  favourite: boolean;
  breed: string;
}
