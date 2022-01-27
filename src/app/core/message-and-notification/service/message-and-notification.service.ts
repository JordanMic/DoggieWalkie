import {Injectable, NgZone} from '@angular/core';
import {UserService} from '../../user/service/user.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {MessageThread} from '../model/message-thread';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ActionStreamModel, MessageStreamModel, NotificationStreamModel, StreamModel} from '../model/stream-model';
import {StreamDataType} from '../utils/stream-data-type.enum';
import {MatDialog} from '@angular/material/dialog';
import {MessageAlertDialogComponent} from '../message-alert-dialog/message-alert-dialog.component';
import {Notification} from '../model/notification';
import {Action} from '../utils/action.enum';

@Injectable({
  providedIn: 'root'
})
export class MessageAndNotificationService {
  public messages = new BehaviorSubject<MessageThread[]>([]);
  public notifications = new BehaviorSubject<Notification[]>([]);
  subscription = new Subscription();
  private stream: EventSource | null;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private zone: NgZone,
    private matDialog: MatDialog
  ) {
    let userData = this.userService.getUserData();

    if (userData) {
      this.refreshMessages();
      this.refreshNotification();
      this.initStream();
    }

    userService.get().subscribe(value => {
      if (value) {
        this.refreshMessages();
        this.refreshNotification();
        if (!this.stream) {
          this.initStream();
        }
      } else {
        this.disconnect();
      }

    })
  }

  private initStream() {
    this.subscription.add(this.connectToStream().subscribe((value: StreamModel) => {
      switch (value.type) {

        case StreamDataType.NOTIFICATION:
          let notificationStreamModel = <NotificationStreamModel> value;
          this.addNewNotification(notificationStreamModel);
          break;

        case StreamDataType.MESSAGE:
          let messageStreamModel = <MessageStreamModel>value;
          this.addNewMessageToThread(messageStreamModel);
          this.openMessageDialog(messageStreamModel);
          break;
        case StreamDataType.ACTION:
          let action = <ActionStreamModel> value;
          this.executeAction(action);
          break;
      }

    }));
  }

  private addNewMessageToThread(model: MessageStreamModel) {
    let messageThreads = this.messages.getValue();

    for (let i = 0; i < messageThreads.length; i++) {
      if (messageThreads[i].id == model.value.messageThreadId) {
        messageThreads[i].unread = true;
        messageThreads[i].messages.push(model.value.messageModel);
      }
    }
    this.messages.next(messageThreads);
  }

  private refreshMessages() {
    if(this.userService.isLogged()) {
      this.http.get<MessageThread[]>('/message_thread').subscribe(value => {
        this.messages.next(value);
      })
    } else {
      this.messages.next([]);
    }
  }

  private refreshNotification() {
    if(this.userService.isLogged()) {
      this.http.get<Notification[]>('/notification').subscribe(value => {
        this.notifications.next(value);
      })
    } else {
      this.messages.next([]);
    }
  }

  refresh() {
    this.refreshMessages();
    this.refreshNotification()
  }

  private connectToStream(): Observable<any> {
    return new Observable(
      observer => {
        this.stream = new EventSource(environment.streamPath + "?token=" + this.userService.getUserData()?.token);
        this.stream.onmessage = event => {
          this.zone.run(() => {
            observer.next(JSON.parse(event.data))
          })
        }
        this.stream.onerror = event => {
          this.zone.run(() => {
            observer.error(event)
          })
        }
      }
    )
  }

  markAsRead(id: number) {
    let value = this.messages.getValue();

    for (let i = 0; i < value.length; i++) {
      if (value[i].id == id) {
        value[i].unread = false;
      }
    }

    this.messages.next(value);
  }

  private disconnect() {
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
    if (this.stream) {
      this.stream.close();
      this.stream = null;
    }
  }

  private openMessageDialog(model: MessageStreamModel) {

    let messageThread = this.messages.getValue().filter(value => value.id == model.value.messageThreadId)[0];

    const timeout = 300000;
    const dialogRef = this.matDialog.open(MessageAlertDialogComponent, {
      width: '350px',
      maxHeight: "40vh",
      data: {model: model,thread: messageThread},
      position: {
        right: "20px",
        bottom: "20px"
      },
      hasBackdrop: false,
      panelClass: 'alert-dialog'
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout)
    })
  }

  private addNewNotification(notificationStreamModel: NotificationStreamModel) {
    let value = this.notifications.getValue();
    value = [notificationStreamModel.value, ...value]
    this.notifications.next(value);
  }

  private executeAction(action: ActionStreamModel) {
    switch (action.value.type) {
      case Action.REFRESH_MESSAGES:
        this.refreshMessages();
        break;
    }
  }

  public readNotification(id: number) {
    this.http.put('/notification/' + id, {}).subscribe(value => {
      this.refreshNotification()
    })
  }
}
