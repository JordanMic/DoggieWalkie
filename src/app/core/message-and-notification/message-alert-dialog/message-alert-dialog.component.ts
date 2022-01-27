import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MessageStreamModel} from '../model/stream-model';
import {MessageThread} from '../model/message-thread';
import {Router} from '@angular/router';

@Component({
  selector: 'app-message-alert-dialog',
  templateUrl: './message-alert-dialog.component.html',
  styleUrls: ['./message-alert-dialog.component.scss']
})
export class MessageAlertDialogComponent implements OnInit {
  data: {model: MessageStreamModel, thread: MessageThread};

  constructor(
    private dialogRef: MatDialogRef<MessageAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public value: any,
    private router: Router
  ) {
    this.data = value;
  }

  ngOnInit(): void {

  }

  replay() {
    this.router.navigate(['messages', this.data.thread.id])
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close();
  }
}
