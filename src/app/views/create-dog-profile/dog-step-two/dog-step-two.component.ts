import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  GenderDictionary,
  GenderEnum,
  CastrationDictionary,
  ICreateDogProfile
} from '../../../models/create-dog-profile-model';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-dog-step-two',
  templateUrl: './dog-step-two.component.html',
  styleUrls: ['./dog-step-two.component.scss']
})
export class DogStepTwoComponent implements OnInit {
  dog: ICreateDogProfile;
  form: FormGroup;
  eGender: [GenderEnum, string][] = Array.from(GenderDictionary.entries());
  eCastration: [boolean, string][] = Array.from(CastrationDictionary.entries());


  constructor(private router: Router ) {
    this.dog = router.getCurrentNavigation()?.extras.state as ICreateDogProfile;

    if (this.dog === undefined) {
      router.navigate(['create-user-profile', 'step-one']);
    }

    this.form = new FormGroup({
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      castration: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  goToStepThree(): void{
    if (this.form.valid){
      const formValues = {
        dateOfBirth: formatDate(this.form.value.dateOfBirth, 'dd.MM.yyyy', 'en-US'),
        gender: this.form.value.gender,
        castration: this.form.value.castration,
      };
      const newDogState: ICreateDogProfile = {...this.dog, ...formValues};
      this.router.navigate(['create-dog-profile', 'dog-step-three'], {state: newDogState});
    }
  }
}
