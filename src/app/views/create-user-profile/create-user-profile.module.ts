import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StepOneComponent} from './step-one/step-one.component';
import {StepTwoComponent} from './step-two/step-two.component';
import {StepThreeComponent} from './step-three/step-three.component';
import {StepFourComponent} from './step-four/step-four.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateUserService} from './service/create-user.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
      StepOneComponent,
      StepTwoComponent,
      StepThreeComponent,
      StepFourComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [CreateUserService],
})
export class CreateUserProfileModule { }
