import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserProfileModel} from '../../views/user-profile/model/user-profile-model';
import {MatDialog} from '@angular/material/dialog';
import {ChangePhotoModalComponent} from '../change-photo-modal/change-photo-modal.component';
import {UserService} from '../../core/user/service/user.service';


@Component({
  selector: 'app-user-profile-setings',
  templateUrl: './user-profile-setings.component.html',
  styleUrls: ['./user-profile-setings.component.scss']
})
export class UserProfileSetingsComponent implements OnInit {
  userProfile: UserProfileModel;
  image: string | ArrayBuffer | null;

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

  changePhoto() {
    this.dialog.open(ChangePhotoModalComponent).afterClosed().subscribe(
      value => {
        this.http.post('user/profile/avatar', value).subscribe(value1 => {
          this.refreshData();
          this.userService.updateUserData();
        });
      }
    );
  }

  save() {
    const profileData = this.userProfile;

    const value = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      phoneNumber: profileData.phoneNumber,
      header: profileData.header,
      shortBio: profileData.shortBio,
      townId: profileData.town.id
    };

    this.http.put('user/profile', value).subscribe(value1 => {
      this.userService.updateUserData();
    });
  }

  deletePhoto() {
    this.http.delete('user/profile/avatar').subscribe(value1 => {
      this.refreshData();
      this.userService.updateUserData();
    });
  }

  private refreshData() {
    this.http.get('/user/profile').toPromise()
      .then(value => {
        this.userProfile = value as UserProfileModel;
      })
      .catch(reason => {
      });
  }
}
