import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { IUser, UserViewModel } from 'src/app/models/users/user';
import { UserProfileModel  } from './model/user-profile-model';
import {ApiService} from '../../services/api/api.service';
import {UserProfileService} from './service/user-profile.service';
import {UserProfileOpinionModel} from './model/user-profile-opinion-model';
import {MessageService} from '../../core/message-and-notification/service/message.service';
import {ChangeTownModalComponent} from '../../components/change-town-modal/change-town-modal.component';
import {Town} from '../../core/location/model/location';
import {MatDialog} from '@angular/material/dialog';
import {CreateMessageThreadComponent} from '../../components/create-message-thread/create-message-thread.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['../shared/profile/profile.scss', ]
})
export class UserProfileComponent implements OnInit, AfterViewInit {

  @ViewChild('avatar') avatar: ElementRef;
  public user: UserProfileModel;
  public opinions: UserProfileOpinionModel[];
  public viewUser: UserViewModel;
  public userId: number;
  public score: number;
  public viewOpinion = false;


  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private userProfileApi: UserProfileService,
    private messageService: MessageService,
    private router: Router,
    private dialog: MatDialog,
    ) { }

  async ngAfterViewInit() {
    this.user = await this.userProfileApi.viewProfile(this.userId);
    this.avatar.nativeElement.style.backgroundImage = `url('${this.viewUser.imgUrl}')`;
  }

  async ngOnInit(): Promise<void>{
    this.userId = this.route.snapshot.params.id;
    this.user = await this.userProfileApi.viewProfile(this.userId);
    this.score = Math.ceil((this.user.sumOfRatings / (this.user.numberOfRatings || 1)) * 100) / 100;
  }

   hideOpinion(): void{
    this.viewOpinion = false;
  }

  goToProfile(userId: number): void{
    this.router.navigate(['user', userId]);
  }

  openChat() {
    this.messageService.findChatByParticipant(this.userId).subscribe(value => {
      console.log(value)
      if (value) {
        this.router.navigate(['messages', value])
      } else {
        this.dialog.open(CreateMessageThreadComponent).afterClosed().subscribe(
          value => {
            this.messageService.createThread(this.userId, value).subscribe(id => {
              this.router.navigate(['messages', id])
            })
          }
        );
      }
    });
  }

  async showOpinion(): Promise<void>{
    this.viewOpinion = true;
    const userId: number = this.route.snapshot.params.id;
    this.opinions = await this.userProfileApi.viewOpinion(userId);
    this.opinions.sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1);
  }

  goToMainPage(): void{
    this.router.navigate(['dog-list']);
  }

}

