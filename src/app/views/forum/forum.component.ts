import { Component, OnInit } from '@angular/core';
import {HomePageModel} from './model/homePage-model';
import {ForumService} from './service/forum.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  public homePageData: HomePageModel;

  constructor(
    private forumService: ForumService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.homePageData = await this.forumService.getHomePage();
  }

  goToCategory(categoryID: number): void{
    this.router.navigate(['forum', 'category', categoryID]);
  }

}
