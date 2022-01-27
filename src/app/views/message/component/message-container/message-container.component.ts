import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MessageThread} from '../../../../core/message-and-notification/model/message-thread';
import {
  MessageAndNotificationService
} from '../../../../core/message-and-notification/service/message-and-notification.service';
import {MessageWindowComponent} from '../message-window/message-window.component';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent implements OnInit, OnDestroy {
  messageThreads: MessageThread[] = [];
  currentThread: MessageThread | null = null;
  subscription = new Subscription();
  @ViewChild(MessageWindowComponent) child:MessageWindowComponent;

  constructor(
    private router: Router,
    private client: HttpClient,
    private messageAndNotificationService: MessageAndNotificationService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.update(this.messageAndNotificationService.messages.getValue());

    this.subscription.add(this.messageAndNotificationService.messages.subscribe(value => {
      this.update(value);
    }));

    this.subscription.add(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.updateCurrentThread();
    }));
  }

  private updateCurrentThread() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id == null || id == '') {
      if (this.messageThreads.length) {
        this.router.navigate(['messages', this.messageThreads[0].id])
      } else {
        this.currentThread = null;
      }
    } else {
      if (this.messageThreads.length) {
        let filter = this.messageThreads.filter((value, index) => {
          return value.id == Number.parseInt(<string>id)
        })[0];

        if (filter) {
          this.currentThread = filter;
        } else {
          this.currentThread = null;
        }
      } else {
        this.currentThread = null;
      }
    }

    if (this.child) {
      this.child.scrollToBottom();
      this.child.readMessages();
    }
  }

  private update(messages: MessageThread[]) {
    console.log(messages)
    if (messages.length) {
      this.messageThreads = messages;
    } else {
      this.messageThreads = [];
    }

    this.updateCurrentThread();
  }

  search(value: string) {

  }

  openChat(messageThread: MessageThread) {
    this.router.navigate(['messages', messageThread.id]).then(value => {
      this.updateCurrentThread();
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
