import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  note: string;
  constructor(private notification: NotificationService) { }

  ngOnInit(): void {
    this.notification.getNotificationAsObservable().subscribe(value => {
      this.note = value;
    });
  }

}
