import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {MessageThread} from '../../../../core/message-and-notification/model/message-thread';
import {Message} from '../../../../core/message-and-notification/model/message';
import {MessageAuthor} from '../../utils/message-author.enum';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input()
  messageThread: MessageThread;
  @Input()
  message: Message;
  @Input()
  participantAvatar: TemplateRef<any>
  messageAuthorType = MessageAuthor;
  author: MessageAuthor;

  constructor() { }

  ngOnInit(): void {
    switch (this.message.author) {
      case this.messageThread.participant.id:
        this.author = MessageAuthor.OTHER;
        break;
      case null:
        this.author = MessageAuthor.SYSTEM;
        break;
      default:
        this.author = MessageAuthor.OWN;
    }
  }

}
