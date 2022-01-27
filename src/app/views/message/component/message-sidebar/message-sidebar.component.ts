import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageThread} from '../../../../core/message-and-notification/model/message-thread';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-message-sidebar',
  templateUrl: './message-sidebar.component.html',
  styleUrls: ['./message-sidebar.component.scss']
})
export class MessageSidebarComponent implements OnInit {
  @Input()
  messageThreads: MessageThread[] = [];
  @Output()
  search$: EventEmitter<string> = new EventEmitter<string>()
  @Output()
  openChat$: EventEmitter<MessageThread> = new EventEmitter<MessageThread>()
  searchBox = new FormControl('');

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToMainPage() {
    this.router.navigateByUrl('/dog-list')
  }

  search($event: Event) {
    this.search$.emit(this.searchBox.value)
  }

  public clear() {
    this.searchBox.setValue('');
  }
}
