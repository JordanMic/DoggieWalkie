export interface UserProfileModel {
  firstName: string;
  lastName: string;
  username: string;
  avatar?: Blob;
  phoneNumber: string;
  header: string;
  createdAt: string;
  numberOfDogs: number;
  numberOfWalks: number;
  numberOfOrderedWalks: number;
  shortBio?: string;
  reputationPoints: number;
  numberOfRatings: number;
  sumOfRatings: number;
  town: {
    id: number;
    name: string;
  };
  listOfDogs: [
    {
      breed: string,
      dogName: string,
      avatar?: Blob;
      id: number,
      status: boolean,
      town: string
    }
  ];
}
