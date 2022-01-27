import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser, UserViewModel } from 'src/app/models/users/user';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['../shared/profile/profile.scss', './user-reviews.component.scss']
})
export class UserReviewsComponent implements OnInit, AfterViewInit {

  @ViewChild('avatar') avatar: ElementRef;
  public reviews: Array<any>;
  public viewUser: UserViewModel;
  public userId: number;
  public score: number;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
    ) { }

  ngAfterViewInit(): void {
    this.avatar.nativeElement.style.backgroundImage = `url('${this.viewUser.imgUrl}')`;
  }

  async ngOnInit(): Promise<void>{
    const userId: number = this.route.snapshot.params.id;
    this.score = 4.5;

    this.reviews = [
        {
            author: "Marian",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus auctor libero sit amet ultrices. Praesent consectetur a leo a pulvinar. Maecenas malesuada tincidunt sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin a neque massa. Maecenas quis nisl risus. Fusce interdum ante at lorem gravida, eu tempus lacus tempor. In commodo lectus ut eros iaculis facilisis. Etiam hendrerit scelerisque ligula in interdum. Nulla tristique vulputate neque non finibus",
            date: "tydzień temu",
            score: 4
        },
        {
            author: "Maciej",
            text: "Donec vitae nisi massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras commodo metus lectus, non eleifend turpis rhoncus eu. Proin porta velit fringilla, maximus justo a, scelerisque diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In a hendrerit magna. In urna diam, commodo in interdum et, interdum a risus. In posuere volutpat placerat. Cras dapibus diam ut ultrices finibus. Etiam eget dapibus diam. In vel enim quis nisl blandit molestie. Cras varius eget erat sed elementum.",
            date: "tydzień temu",
            score: 5
        }
    ]

  }

}

