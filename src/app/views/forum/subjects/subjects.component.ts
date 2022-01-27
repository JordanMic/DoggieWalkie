import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ForumService} from '../service/forum.service';
import {CategoryPageModel, CategoryPageResponse} from '../model/categoryPage-model';
import {HomePageModel} from '../model/homePage-model';
import {UserService} from '../../../core/user/service/user.service';
import {NeedToWalkModalComponent} from '../../../components/need-to-walk-modal/need-to-walk-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {NewPostsModalComponent} from '../../../components/forum-modals/new-posts-modal/new-posts-modal.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./../forum.component.scss']
})
export class SubjectsComponent implements OnInit {

  public categoryPageRequest: CategoryPageModel;
  public categoryPageResponse: CategoryPageResponse;
  public homePageData: HomePageModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forumService: ForumService,
    private dialog: MatDialog,
  ) { }

  async ngOnInit() {
    const categorysId: number = this.route.snapshot.params.id;

    this.categoryPageRequest = {
      categoryId: categorysId,
      page: 0,
      sizeOfPage: 10,
    };

    this.homePageData = await this.forumService.getHomePage();
    this.categoryPageResponse = await this.forumService.getCategoryPage(this.categoryPageRequest);

  }

  goToHomePage(): void{
    this.router.navigate(['forum']);
  }

  async goToCategory(categoryId: number): Promise<void>{
    await this.router.navigate(['forum', 'category', categoryId]);
    this.ngOnInit();
  }

  goToPostPage(postId: number): void{
    const categorysId: number = this.route.snapshot.params.id;
    this.router.navigate(['forum', 'category', categorysId, 'post', postId]);
  }

  addNewPost(): void{
      const categorysId: number = this.route.snapshot.params.id;
      this.dialog.open(NewPostsModalComponent, {
        width: '60%',
        height: 'auto',
        data: {
          categoryId: categorysId
        }}).afterClosed().subscribe(result => {
        this.ngOnInit();
    });
  }

}
