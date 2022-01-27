import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-message-thread',
  templateUrl: './create-message-thread.component.html',
  styleUrls: ['./create-message-thread.component.scss']
})
export class CreateMessageThreadComponent implements OnInit {
  messageBox = new FormControl('');

  constructor(
    private dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
  }

  sendMessage() {
    this.dialogRef.close(this.messageBox.value);
  }
}
