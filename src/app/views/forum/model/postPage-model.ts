export interface PostPageRequest{
  page: number;
  postId: number;
  sizeOfPage: number;
}

export interface PostPageModel{
  categoryId: number;
  categoryName: string;
  closed: true;
  commentModels: CommentModels[];
  content: string;
  createdAt: Date;
  numberOfComments: number;
  numberOfLikes: number;
  postId: number;
  reputationPoints: number;
  like: boolean;
  title: string;
  userForumModels: UserForumModels[];
  myReputationPoints: number;
  userProfileAvatar: Blob;
  userProfileFirstName: string;
  userProfileLastName: string;
  userProfileId: number;
}

export interface CommentModels {
  commentId: number;
  content: string;
  createdAt: Date;
  numberOfAllComments: number;
  like: boolean;
  numberOfLikes: number;
  userBaseId: number;
}

export interface UserForumModels{
  userBaseId: number;
  userProfileAvatar: Blob;
  userProfileFirstName: string;
  userProfileId: number;
  userProfileLastName: string;
  userReputationPoints: number;
  username: string;
}
