import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageSidebarComponent } from './component/message-sidebar/message-sidebar.component';
import { MessageComponent } from './component/message/message.component';
import { MessageContainerComponent } from './component/message-container/message-container.component';
import { MessageWindowComponent } from './component/message-window/message-window.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule as AngularDropdowns} from '@progress/kendo-angular-dropdowns';
import {SharedModule as OwnShared} from '../../shared/shared.module';



@NgModule({
  declarations: [
    MessageSidebarComponent,
    MessageComponent,
    MessageContainerComponent,
    MessageWindowComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AngularDropdowns,
    OwnShared
  ]
})
export class MessageModule { }
