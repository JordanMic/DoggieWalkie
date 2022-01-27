import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageThread} from '../model/message-thread';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MessageAndNotificationService} from './message-and-notification.service';
import {Message} from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private httpClient: HttpClient,
    private messageAndNotificationService: MessageAndNotificationService
  ) { }

  findChatByParticipant(userId: number): Observable<number | null> {
    return this.httpClient.get<MessageThread | null>("/message_thread/participant/" + userId).pipe(map(value => {return value ? value.id : null}));

  }

  createThread(userId: number, value: any) {
    return this.httpClient.post<MessageThread>("/message_thread/participant/" + userId, value).pipe(map(value1 => {
      this.messageAndNotificationService.refresh();
      console.log(value1)
      return value1.id
    }));
  }

  readThread(id: number | undefined) {
    if (id) {
      this.httpClient.get("message_thread/" + id + "/read").subscribe(value => {
        this.messageAndNotificationService.markAsRead(id);
      })
    }
  }

  sendMessage(id: number, value: any) {
    return this.httpClient.post<Message>("/message", {messageThreadId: id, content: value});
  }
}
