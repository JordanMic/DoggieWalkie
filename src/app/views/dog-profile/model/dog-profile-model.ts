export interface DogProfileModel{
  name: string;
  breed: string;
  createdAt: Date;
  dateOfBirth: Date;
  gender: string;
  avatar?: Blob;
  castration: boolean;
  status: boolean;
  header: string;
  description: string;
  userBaseId: number;
  ownerAvatar?: Blob;
  firstName: string;
  lastName: string;
  numberOfRatings: number;
  sumOfRatings: number;
}
