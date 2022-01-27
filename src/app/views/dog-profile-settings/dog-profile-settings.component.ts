import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {ChangePhotoModalComponent} from '../../components/change-photo-modal/change-photo-modal.component';
import {DogProfileSettingsModel} from './model/dog-profile-settings-model';
import {GenderDictionary, GenderEnum} from './model/dog-profile-settings-model';
import {CastrationDictionary} from '../../models/create-dog-profile-model';
import {DogsSliderService} from '../../shared/dogs-slider/dogs-slider.service';
import {dogs} from '../create-dog-profile/data';
import {ChangeTownModalComponent} from '../../components/change-town-modal/change-town-modal.component';
import {NeedToWalkModalComponent} from '../../components/need-to-walk-modal/need-to-walk-modal.component';
import {NotificationService} from '../../services/notification.service';
import {RejectModalComponent} from '../../components/walk-requests-lists-modals/reject-modal/reject-modal.component';
import {DeleteAccountModalComponent} from '../../components/delete-account-modal/delete-account-modal.component';
import {SuccesSettingModalComponent} from "../../components/succes-setting-modal/succes-setting-modal.component";

@Component({
    selector: 'app-dog-profile-settings',
    templateUrl: './dog-profile-settings.component.html',
    styleUrls: ['./dog-profile-settings.component.scss', '../shared/profile/profile.scss']
})
export class DogProfileSettingsComponent implements OnInit {
    id: number;
    dog: DogProfileSettingsModel | null;
    image: string | ArrayBuffer | null;
    eGender: [GenderEnum, string][] = Array.from(GenderDictionary.entries());
    eCastration: [boolean, string][] = Array.from(CastrationDictionary.entries());
    form: FormGroup;
    dogs = dogs;

    constructor(
      private http: HttpClient,
      private router: Router,
      private dialog: MatDialog,
      private dogSliderService: DogsSliderService,
      private notification: NotificationService
      ) {
      this.form = new FormGroup({
        dogName: new FormControl('', [Validators.required]),
        race: new FormControl('', [Validators.required]),
        castration: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        dateOfBirth: new FormControl('', [Validators.required]),
      });
    }

    ngOnInit(): void {
      this.refreshData();

      this.dogSliderService.chosenDog.subscribe(value => {
        this.id = Number(value);
        this.dog = null;
        this.refreshData();
      });
    }

  changePhoto(): void {
    this.dialog.open(ChangePhotoModalComponent).afterClosed().subscribe(
      value => {
        this.http.post('dog/profile/avatar/' + this.id, value).subscribe( value1 => {
          this.refreshData();
        });
      });
  }

  save(): void {
    if (this.dog == null) { return; }
    const profileData = this.dog;

    const customDate: Date = new Date(this.form.value.dateOfBirth);
    const customDay = customDate.getDate();
    const customMonth = customDate.getMonth() + 1 ;
    const customYear = customDate.getFullYear();

    const value = {
      breedOfDog: this.form.value.race,
      dogName: this.form.value.dogName,
      dateOfBirth: `${customDay}.${customMonth}.${customYear}`,
      gender: this.form.value.gender,
      castration: this.form.value.castration,
      description: this.form.value.description,
    };

    this.http.put('dog/' + this.id, value).subscribe(reason => {
      this.dialog.open(SuccesSettingModalComponent);
    });
  }

  deletePhoto(): void {
    this.http.delete('dog/profile/avatar/' + this.id).subscribe(result => {
      this.refreshData();
    });

    }

  private refreshData(): void{
    this.http.get('dog/' + this.id).toPromise()
      .then(value => {
        const response = value as DogProfileSettingsModel;
        const [day, month, year] = (response.dateOfBirth as unknown as string).split('.');
        // @ts-ignore
        response.dateOfBirth = new Date(+year, +month - 1, +day);
        this.dog = response;
        this.form.setValue({
          dogName: response.dogName,
          race: response.breedOfDog,
          castration: response.castration,
          gender: response.gender,
          description: response.description,
          dateOfBirth: response.dateOfBirth,
        });
      })
      .catch(reason => {
      });
  }

  async delete(doggId: number): Promise<void>{
    this.dialog.open(DeleteAccountModalComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        dogId: doggId
      }
    }).afterClosed().subscribe(resulst => {
      window.location.reload();
    });
  }
}
