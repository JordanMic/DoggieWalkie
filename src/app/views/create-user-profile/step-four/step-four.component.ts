import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CreateUserProfileModel} from '../model/create-user-profile-model';

import {CreateUserService} from '../service/create-user.service';


@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent implements OnInit {
  data: CreateUserProfileModel;

  constructor(private createUserService: CreateUserService, private router: Router) {
    this.data = createUserService.getModel();
  }

  async ngOnInit(): Promise<void> {
    this.createUserService.createProfile().catch(reason => {
      this.router.navigate(['create-user-profile', 'step-one']);
      console.log(reason);
    });
  }

  goToMainPage(): void {
    this.router.navigate(['dog-list']);
  }
}
