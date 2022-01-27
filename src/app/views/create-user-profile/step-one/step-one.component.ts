import { ApiService } from './../../../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CreateUserService} from '../service/create-user.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {

  form: FormGroup;
  constructor(private router: Router, private createUserService: CreateUserService) {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }
  async goToStepTwo(){
    if (this.form.valid){
      this.createUserService.updateModel(this.form.value);
      this.router.navigate(['create-user-profile', 'step-two']);
    }
  }

}
