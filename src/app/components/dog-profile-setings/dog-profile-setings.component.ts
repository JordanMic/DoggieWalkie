import { Component, OnInit } from '@angular/core';
import {UserProfileModel} from "../../views/user-profile/model/user-profile-model";

@Component({
  selector: 'app-dog-profile-setings',
  templateUrl: './dog-profile-setings.component.html',
  styleUrls: ['./dog-profile-setings.component.scss']
})
export class DogProfileSetingsComponent implements OnInit {
  dogProfile: UserProfileModel;
  image: string | ArrayBuffer | null;


  constructor() { }

  ngOnInit(): void {
  }

}
