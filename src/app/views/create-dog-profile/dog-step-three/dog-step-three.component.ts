import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import {ICreateDogProfile} from '../../../models/create-dog-profile-model';

@Component({
  selector: 'app-dog-step-three',
  templateUrl: './dog-step-three.component.html',
  styleUrls: ['./dog-step-three.component.scss']
})
export class DogStepThreeComponent implements OnInit {
  dog: ICreateDogProfile;
  form: FormGroup;
  constructor(private router: Router ) {
    this.dog = router.getCurrentNavigation()?.extras.state as ICreateDogProfile;

    if (this.dog === undefined) {
      router.navigate(['create-user-profile', 'step-one']);
    }

    this.form = new FormGroup({
      header: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
 async goToStepFour(){
    if (this.form.valid){
      const newDogState = {...this.dog, ...this.form.value};
      this.dog.header = this.form.value?.header;
      this.dog.description = this.form.value?.shortBio;
      await this.router.navigate(['create-dog-profile', 'dog-step-four'], {state: newDogState});
    }
  }
}
