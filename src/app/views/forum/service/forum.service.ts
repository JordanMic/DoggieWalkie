import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../core/user/service/user.service';
import {Router} from '@angular/router';
import {apiErrorHandler} from '../../../services/api/helpers/api-error-handler';
import {HomePageModel} from '../model/homePage-model';
import {CategoryPageModel, CategoryPageResponse} from '../model/categoryPage-model';
import {stringify} from '@angular/compiler/src/util';
import {NewPostModel} from '../../../components/forum-modals/new-posts-modal/model/new-post-model';
import {PostPageModel, PostPageRequest} from "../model/postPage-model";
import {NewCommentModel} from "../../../components/forum-modals/new-comment-modal/model/new-comment-model";
import {ReportCommentModel} from "../../../components/forum-modals/report-comment-modal/model/report-comment-model";
import {ReportPostModel} from "../../../components/forum-modals/report-post-modal/model/report-post-model";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private httpClient: HttpClient,
              private userService: UserService,
              private router: Router) { }

  getHomePage(): Promise<HomePageModel> {
    try {
      return this.httpClient.get<HomePageModel>('/forum').toPromise();
    } catch (error) {
      apiErrorHandler(error as HttpErrorResponse, this.router, this.userService);
      throw error;
    }
  }

  getCategoryPage(value: CategoryPageModel): Promise<CategoryPageResponse> {
    try {
      return this.httpClient.post<CategoryPageResponse>('/forum/category/get',  value).toPromise();
    } catch (error) {
      apiErrorHandler(error as HttpErrorResponse, this.router, this.userService);
      throw error;
    }
  }

  getPostPage(value: PostPageRequest): Promise<PostPageModel> {
    try {
      return this.httpClient.post<PostPageModel>('/forum/post/get',  value).toPromise();
    } catch (error) {
      apiErrorHandler(error as HttpErrorResponse, this.router, this.userService);
      throw error;
    }
  }


  async newPost(data: NewPostModel): Promise<void>{
    return this.httpClient.post<void>('/forum/post', data).toPromise();
  }

  async newComment(data: NewCommentModel): Promise<void>{
    return this.httpClient.post<void>('/forum/comment', data).toPromise();
  }

  async reportComment(data: ReportCommentModel): Promise<void>{
    return this.httpClient.post<void>('/forum/comment/report', data).toPromise();
  }

  async reportPost(data: ReportPostModel): Promise<void>{
    return this.httpClient.post<void>('/forum/post/report', data).toPromise();
  }

  async liketPost(postId: number): Promise<void>{
    return this.httpClient.post<void>('/forum/post/like/' + postId, undefined).toPromise();
  }

  async likeComment(commentId: number): Promise<void>{
    return this.httpClient.post<void>('/forum/comment/like/' + commentId, undefined).toPromise();
  }
}
