import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ForumService} from '../service/forum.service';
import {MatDialog} from '@angular/material/dialog';
import {HomePageModel} from '../model/homePage-model';
import {PostPageModel, PostPageRequest} from '../model/postPage-model';
import {NewPostsModalComponent} from '../../../components/forum-modals/new-posts-modal/new-posts-modal.component';
import {NewCommentModalComponent} from '../../../components/forum-modals/new-comment-modal/new-comment-modal.component';
import {ReportCommentModalComponent} from '../../../components/forum-modals/report-comment-modal/report-comment-modal.component';
import {ReportPostModalComponent} from '../../../components/forum-modals/report-post-modal/report-post-modal.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public postPageResponse: PostPageModel;
  public postPageRequest: PostPageRequest;
  public homePageData: HomePageModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forumService: ForumService,
    private dialog: MatDialog,
  ) { }

  async ngOnInit() {
    const postID: number = this.route.snapshot.params.id;

    this.postPageRequest = {
      page: 0,
      postId: postID,
      sizeOfPage: 10,
    };

    this.homePageData = await this.forumService.getHomePage();
    this.postPageResponse = await this.forumService.getPostPage(this.postPageRequest);
  }

  goToHomePage(): void{
    this.router.navigate(['forum']);
  }

  async goToCategory(categoryId: number): Promise<void>{
    await this.router.navigate(['forum', 'category', categoryId]);
  }

  addNewComment(): void{
    const postID: number = this.route.snapshot.params.id;
    this.dialog.open(NewCommentModalComponent, {
      width: '60%',
      height: 'auto',
      data: {
        postId: postID
      }}).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  postReport(): void{
    const postID: number = this.route.snapshot.params.id;
    this.dialog.open(ReportPostModalComponent, {
      width: '50%',
      height: 'auto',
      data: {
        postId: postID
      }}).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  commentReport(commentIds: number): void{
    this.dialog.open(ReportCommentModalComponent, {
      width: '50%',
      height: 'auto',
      data: {
        commentId: commentIds
      }}).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


  async postLike(): Promise<void>{
    const postID: number = this.route.snapshot.params.id;
    await this.forumService.liketPost(postID);
    this.ngOnInit();
  }

  async commentLike(commentId: number): Promise<void>{
    await this.forumService.likeComment(commentId);
    this.ngOnInit();
  }

  goToRulesPage(): void{
    this.router.navigate(['forum', 'category', '2']);
  }

  goToProfile(profileId: number): void{
    this.router.navigate(['user', profileId]);
  }

  goToCommentProfile(profile1Id: number): void{
    this.router.navigate(['user', profile1Id]);
  }




}
