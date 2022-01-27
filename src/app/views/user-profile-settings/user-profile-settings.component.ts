import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileModel } from '../user-profile/model/user-profile-model';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../core/user/service/user.service';
import {ChangePhotoModalComponent} from '../../components/change-photo-modal/change-photo-modal.component';
import {ChangeTownModalComponent} from '../../components/change-town-modal/change-town-modal.component';
import {Town} from '../../core/location/model/location';
import {SuccesSettingModalComponent} from "../../components/succes-setting-modal/succes-setting-modal.component";

@Component({
    selector: 'user-profile-settings',
    templateUrl: './user-profile-settings.component.html',
    styleUrls: ['./user-profile-settings.component.scss', '../shared/profile/profile.scss']
})
export class UserProfileSettingsComponent implements OnInit {
  userProfile: UserProfileModel;
  image: string | ArrayBuffer | null;
  saveStatus: string;
  photoStatus: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.refreshData();
  }

  changePhoto(): void {
    this.dialog.open(ChangePhotoModalComponent).afterClosed().subscribe(
      value => {
        this.http.post('user/profile/avatar', value).subscribe(value1 => {
          this.refreshData();
          this.userService.updateUserData();

        });
      }
    );
  }

  changeTown(): void{
    this.dialog.open(ChangeTownModalComponent).afterClosed().subscribe(
      value => {
        if (value){
          const town: Town = value;
          this.userProfile.town = town;
        }

      }
    );
  }

  save(): void {
    const profileData = this.userProfile;

    const value = {
      firstName: profileData.firstName,
      header: profileData.header,
      lastName: profileData.lastName,
      phoneNumber: profileData.phoneNumber,
      shortBio: profileData.shortBio,
      townId: profileData.town.id
    };

    this.http.put('user/profile', value).subscribe(value1 => {
      this.userService.updateUserData();
      this.dialog.open(SuccesSettingModalComponent)
    });
  }

  deletePhoto(): void {
    this.http.delete('user/profile/avatar').subscribe(value1 => {
      this.refreshData();
      this.userService.updateUserData();
    });
  }

  private refreshData(): void {
    this.http.get('/user/profile').toPromise()
      .then(value => {
        this.userProfile = value as UserProfileModel;
      })
      .catch(reason => {
      });
  }
}
