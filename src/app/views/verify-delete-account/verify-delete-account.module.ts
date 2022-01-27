import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {VerifyDeleteAccountComponent} from './verify-delete-account.component';



@NgModule({
  declarations: [
    VerifyDeleteAccountComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class VerifyDeleteAccountModule { }
