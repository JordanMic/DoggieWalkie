import { ApiService } from './../../../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {CreateUserProfileModel} from '../model/create-user-profile-model';
import {CreateUserService} from '../service/create-user.service';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {
  data: CreateUserProfileModel;

  form: FormGroup;
  constructor(private createUserService: CreateUserService, private router: Router) {
    this.data = createUserService.getModel();

    if (this.data === undefined) {
      router.navigate(['create-user-profile', 'step-one']);
    }

    this.form = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9)]),
      header: new FormControl(''),
      shortBio: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  goToStepFour(){
    if (this.form.valid){
      this.createUserService.updateModel(this.form.value);

      this.router.navigate(['create-user-profile', 'step-four']);
    }
  }
}

export interface Sex {
  display: string;
  value: string;
}
