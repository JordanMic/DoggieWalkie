import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {UserService} from '../../core/user/service/user.service';
import {UserProfileSetingsComponent} from '../user-profile-setings/user-profile-setings.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfigService} from '../../services/config/config.service';
import {UserData} from '../../core/user/model/user-data';
import {
  MessageAndNotificationService
} from '../../core/message-and-notification/service/message-and-notification.service';
import {MessageThread} from '../../core/message-and-notification/model/message-thread';
import {Notification} from '../../core/message-and-notification/model/notification';
import {NotificationType} from '../../core/message-and-notification/utils/notification-type.enum';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  logged = false;
  userData: UserData | null;
  messageThreads: MessageThread[];
  notifications: Notification[];
  showNavbar = true;
  subscription = new Subscription();
  hideNavbarOn = ['sign-in', 'sign-up', 'sign-up-success', 'create-user-profile/step-one', 'create-user-profile/step-two', 'create-user-profile/step-three', 'create-user-profile/step-four'];
  activeForum = false;


  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private config: ConfigService,
    private changeDetectorRef: ChangeDetectorRef,
    private messageAndNotificationService: MessageAndNotificationService
  ){}

  ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.subscription = new Subscription();
    }

  ngOnInit(): void {
    this.logged = this.userService.isLogged();
    this.userData = this.userService.getUserData();
    this.messageThreads = this.messageAndNotificationService.messages.getValue();
    this.notifications = this.messageAndNotificationService.notifications.getValue();

    this.messageAndNotificationService.messages.subscribe(value => {
      this.messageThreads = value;
    })

    this.messageAndNotificationService.notifications.subscribe(value => {
      this.notifications = value;
    })


    this.userService.get().subscribe(value => {
      this.logged = this.userService.isLogged();
      this.userData = value;
      this.changeDetectorRef.detectChanges();
    });

    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      let currentUrl = (event as NavigationEnd).urlAfterRedirects.substr(1);
      this.showNavbar = !this.hideNavbarOn.includes(currentUrl)
    });

    this.router.events.subscribe((e: any) => {
      if(e instanceof NavigationEnd){
        if(e.url.startsWith('/forum')){
          this.activeForum = true;
        } else {
          this.activeForum = false;
        }
      }
    })
  }

  goToSignIn(): void{
    this.router.navigate(['sign-in']);
  }

  goToSignUp(): void{
    this.router.navigate(['sign-up']);
  }

  goToMyProfile(): void{
    this.router.navigate(['user', this.userData?.userData?.userProfileId]);
  }

  goToWalkList(): void{
    this.router.navigate(['manage', 'dog-walk-requests-list']);
  }

  goToMyPack(): void {
    this.router.navigate(['manage', 'my-pack']);
  }

  goToSettings(): void {
    this.router.navigate(['manage', 'user-profile-settings']);
  }

  goToForum(): void {
    this.router.navigate(['forum']);
  }

  goToMain(): void{
    this.router.navigate(['dog-list']);
  }

   goToMainPage(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }

  brandClick(): void{
    if (this.logged === true){
      this.router.navigate(['dog-list']);
    }
    else {
      this.router.navigate(['']);
    }
  }

  goToCreateDogProfile(): void {
    this.config.canCreateDogProfile = true;
    this.router.navigate(['create-dog-profile', 'dog-step-one']);
  }

  openMessages() {
    this.router.navigate(['messages', ''])
  }

  openChat(messageThread: MessageThread) {
    this.router.navigate(['messages', messageThread.id])
  }

  countUnreadMessages() {
    let unread = this.messageThreads.filter(value => {return value.unread});

    return unread.length;
  }

  countUnreadNotifications() {
    let unread = this.notifications.filter(value => {return !value.read});

    return unread.length;
  }

  getNotificationMessage(notification: Notification) {
    switch (notification.type) {
      case NotificationType.NEW_PROPOSAL:
        return notification.value.proposalFirstname + " złożył właśnie propozycje wyprowadzenia psa"
      case NotificationType.PROPOSAL_REJECT:
        return notification.value.ownerFirstname + " odrzucił twoją propozycje wyprowadzenia psa"
      case NotificationType.PROPOSAL_ACCEPTED:
        return notification.value.ownerFirstname + " zaakceptował twoją propozycje wyprowadzenia psa"
      default:
        return '';
    }
  }

  callNotificationAction(notification: Notification) {
    this.messageAndNotificationService.readNotification(notification.id)
    switch (notification.type) {
      case NotificationType.NEW_PROPOSAL:
        this.router.navigateByUrl('/manage/dog-walk-requests-list')
        break;
      case NotificationType.PROPOSAL_REJECT:
        this.router.navigate(['messages', notification.value.messageThreadId])
        break;
      case NotificationType.PROPOSAL_ACCEPTED:
        this.router.navigate(['messages', notification.value.messageThreadId])
        break;
    }
  }
}
