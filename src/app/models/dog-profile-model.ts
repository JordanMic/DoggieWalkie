export interface DogsProfileModel{
  name: string;
  breed: string;
  createdAt: Date;
  dateOfBirth: Date;
  gender: string;
  avatar?: Blob;
  castration: boolean;
  status: boolean;
  description: string;
  userBaseId: number;
  firstName: string;
  lastName: string;

}
