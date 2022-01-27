import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageThread} from '../../core/message-and-notification/model/message-thread';

@Component({
  selector: 'app-message-list-element',
  templateUrl: './message-list-element.component.html',
  styleUrls: ['./message-list-element.component.scss']
})
export class MessageListElementComponent implements OnInit {
  @Input()
  messageThread: MessageThread
  @Output()
  openChat$: EventEmitter<MessageThread> = new EventEmitter<MessageThread>();

  constructor() { }

  ngOnInit(): void {
  }

  openChat(messageThread: MessageThread) {
    this.openChat$.next(messageThread)
  }

  getLastSend(messageThread: MessageThread) {
    return messageThread.messages[messageThread.messages.length - 1].sentAt
  }

}
