import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dog, DogsSliderConfig} from './dogs-slider-config';
import {BehaviorSubject} from 'rxjs';
import {UserService} from '../../core/user/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class DogsSliderService {
  private showAll = false;
  config: BehaviorSubject<DogsSliderConfig> = new BehaviorSubject<DogsSliderConfig>({showAll: this.showAll, dogs: []});
  chosenDog: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.updateData();

    userService.get().subscribe(value => {
      if(value){
        this.updateData();
      }

    });
  }

  changeShowAll(value: boolean): void {
    this.showAll = value;
    console.log('change dog all')
  }

  private updateData() : void{
    this.http.get<Dog[]>('dog/slider').subscribe(value => {
      this.config.next({
        showAll: this.showAll,
        dogs: value
      } as DogsSliderConfig);
      if (this.showAll) {
        this.chosenDog.next(null);
      } else {
        this.chosenDog.next(value[0].dogProfileId)
      }
    })
  }
}
