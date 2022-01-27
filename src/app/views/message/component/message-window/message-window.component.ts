import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {MessageThread} from '../../../../core/message-and-notification/model/message-thread';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../../../../core/message-and-notification/service/message.service';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.scss']
})
export class MessageWindowComponent implements OnInit, AfterViewInit {
  @Input()
  messageThread: MessageThread | null = null;

  message: string;
  messageBox = new FormControl('');
  @ViewChild('messagesWindow', {static: false})
  messegesHtml: ElementRef;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
  }

  sendMessage() {
    if (this.messageThread && this.messageThread?.id) {
      this.messageService.sendMessage(this.messageThread.id, this.messageBox.value).subscribe(value => {
        if (this.messageThread) {
          this.messageThread.messages.push(value);
          this.scrollToBottom()
        }
      })
    }
    this.messageBox.setValue('')
  }

  ngAfterViewInit(): void {
      this.scrollToBottom();
      this.readMessages();
  }

  public scrollToBottom() {
    setTimeout(() => {
      let nativeElement = this.messegesHtml.nativeElement;
      nativeElement.scrollTop = nativeElement.scrollHeight;
    }, 200)
  }

  public readMessages() {
    if (this.messageThread && this.messageThread.unread) {
      this.messageService.readThread(this.messageThread?.id)
    }
  }

  getDogNames() {
    if (this.messageThread && this.messageThread.walk) {
      return this.messageThread.walk.dogs.map(value => value.dogName)
    } else {
      return '';
    }
  }
}
