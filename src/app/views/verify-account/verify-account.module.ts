import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyAccountComponent } from './verify-account.component';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    VerifyAccountComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class VerifyAccountModule { }
