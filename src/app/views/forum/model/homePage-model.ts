export interface HomePageModel{
  categories: [
    {
      category: string,
      categoryId: number,
      lastActiveDate: Date
      lastActiveUserAvatar: Blob,
      lastActiveUserId: number,
      lastActiveFirstName: string,
      lastActiveLastName: string
      numberOfPosts: number,
      reputationPoints: number,
      shortDescription: string
    }
  ];
}
