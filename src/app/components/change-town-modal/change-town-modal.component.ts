import { Component, OnInit } from '@angular/core';
import {District, Town, Voivodeship} from '../../core/location/model/location';
import {CreateUserProfileModel} from '../../views/create-user-profile/model/create-user-profile-model';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocationSearchService} from '../../core/location/service/location-search.service';
import {Router} from '@angular/router';
import {CreateUserService} from '../../views/create-user-profile/service/create-user.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserProfileSettingsComponent} from '../../views/user-profile-settings/user-profile-settings.component';

@Component({
  selector: 'app-change-town-modal',
  templateUrl: './change-town-modal.component.html',
  styleUrls: ['./change-town-modal.component.scss']
})
export class ChangeTownModalComponent implements OnInit {

  voivodeships: Voivodeship[];
  data: CreateUserProfileModel;
  districts: District[] = [];
  subscriptions: Subscription[] = [];

  towns: Town[] = [];
  form: FormGroup;
  constructor(private locationSearchService: LocationSearchService, private router: Router, private createUserService: CreateUserService, private dialogRef: MatDialogRef<UserProfileSettingsComponent>) {
    this.data = createUserService.getModel();

    this.form = new FormGroup({
      voivodeship: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      town: new FormControl('', [Validators.required]),
    });
  }

  apply(): void  {

    // tslint:disable-next-line:no-non-null-assertion
    const town: Town = this.towns.find(({id}) => id === this.form.value.town)!;
    this.dialogRef.close(town);
  }
  async ngOnInit(): Promise<void> {
    this.subscriptions.push(
      this.locationSearchService.findAllVoivodeship().subscribe(value => {
        this.voivodeships = value;
      })
    );
  }

  getDistrict(id: number): void{
    this.subscriptions.push(
      this.locationSearchService.findAllDistricts(id).subscribe(value => {
        this.districts = value;
      })
    );
  }

  async getTown(vId: number, dId: number): Promise<void>{
    this.subscriptions.push(
      this.locationSearchService.findAllTowns(vId, dId).subscribe(value => {
        this.towns = value;
      })
    );
  }
}
