import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageAlertDialogComponent } from './message-alert-dialog/message-alert-dialog.component';
import {SharedModule} from '../../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    MessageAlertDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class MessageAndNotificationModule { }
