export interface UserProfileOpinionModel{
  avatar: Blob;
  createdAt: Date;
  firstName: string;
  lastName: string;
  opinionContent: string;
  rating: number;
  userProfileId: number;
}