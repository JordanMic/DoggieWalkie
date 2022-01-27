import {Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import {CreateUserProfileModel} from '../model/create-user-profile-model';
import {CreateUserService} from '../service/create-user.service';
import {District, Town, Voivodeship} from '../../../core/location/model/location';
import {LocationSearchService} from '../../../core/location/service/location-search.service';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit, OnDestroy {
  voivodeships: Voivodeship[];
  data: CreateUserProfileModel;
  districts: District[] = [];
  subscriptions: Subscription[] = []

  towns: Town[] = [];
  form: FormGroup;
  constructor(private locationSearchService: LocationSearchService, private router: Router, private createUserService: CreateUserService) {
    this.data = createUserService.getModel();

    if (this.data === undefined) {
      router.navigate(['create-user-profile', 'step-one']);
    }

    this.form = new FormGroup({
      voivodeship: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      town: new FormControl('', [Validators.required]),
    });
  }

  async ngOnInit(): Promise<void> {
    this.subscriptions.push(
      this.locationSearchService.findAllVoivodeship().subscribe(value => {
        this.voivodeships = value;
      })
    );
  }

  getDistrict(id: number){
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
  // tslint:disable-next-line:typedef
  async goToStepThree() {
    if (this.form.valid) {
      this.createUserService.updateModel({townId: this.form.value?.town});
      await this.router.navigate(['create-user-profile', 'step-three']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe())
  }
}
