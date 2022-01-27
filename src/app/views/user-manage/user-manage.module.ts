import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManageComponent } from './user-manage/user-manage.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    UserManageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserManageModule { }
