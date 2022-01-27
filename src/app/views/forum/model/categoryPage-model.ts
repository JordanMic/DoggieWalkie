export interface CategoryPageModel{
  categoryId: number;
  page: number;
  sizeOfPage: number;
}

export interface CategoryPageResponse {
  categoryName: string;
  categoryPostsModels: CategoryPostsModels[];
  userForumModels: UserForumModels[];
  shortDescription: string;
  myReputationPoints: number;
}

export interface CategoryPostsModels {
  closed: boolean;
  lastActiveDate: Date;
  numberOfAllPosts: number;
  numberOfComments: number;
  numberOfLikes: number;
  postId: number;
  title: string;
  content: string;
  userBaseId: number;
  lastActiveUserAvatar: Blob;
  lastActiveFirstName: string;
  lastActiveLastName: string;
}

export interface UserForumModels {
  closed: boolean;
  lastActiveDate: Date;
  numberOfAllPosts: number;
  numberOfComments: number;
  numberOfLikes: number;
  postId: number;
  title: string;
  userBaseId: number;
}
