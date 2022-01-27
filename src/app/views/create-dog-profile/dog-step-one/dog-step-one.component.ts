import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {dogs} from '../data';
import {ICreateDogProfile} from '../../../models/create-dog-profile-model';

@Component({
  selector: 'app-dog-step-one',
  templateUrl: './dog-step-one.component.html',
  styleUrls: ['./dog-step-one.component.scss']
})
export class DogStepOneComponent {
  dog: ICreateDogProfile;
  constructor( private router: Router ) {
    this.form = new FormGroup({
      dogName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      breedOfDog: new FormControl('', [Validators.required]),
    });
  }

  dogs = dogs;
  form: FormGroup;

   goToStepTwo(): void{
    if (this.form.valid){
       this.router.navigate(['create-dog-profile', 'dog-step-two'], {state: this.form.value});
      }
    }
}
