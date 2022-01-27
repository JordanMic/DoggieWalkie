import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';
import {ConfigService} from '../../../services/config/config.service';
import {ICreateDogProfile} from '../../../models/create-dog-profile-model';
import {UserService} from '../../../core/user/service/user.service';

@Component({
  selector: 'app-dog-step-four',
  templateUrl: './dog-step-four.component.html',
  styleUrls: ['./dog-step-four.component.scss']
})
export class DogStepFourComponent implements OnInit {
  dog: ICreateDogProfile;
  constructor(
    public router: Router,
    public api: ApiService,
    private config: ConfigService,
    private userService: UserService
  ) {
    this.dog = router.getCurrentNavigation()?.extras.state as ICreateDogProfile;

    if (this.dog === undefined) {
      router.navigate(['create-user-profile', 'step-one']);
    }
  }


  async ngOnInit(): Promise<void> {
    try{
      await this.api.dog.createDog(this.dog);
      this.config.canCreateDogProfile = false;
      this.userService.updateUserData();
    }catch (e){

    }
  }

  goToNewsPage(): void {
    this.router.navigate(['dog-list']);
  }
}
