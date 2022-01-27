import {Component, Input, OnInit} from '@angular/core';
import {DogsSliderService} from './dogs-slider.service';
import {Dog, DogsSliderConfig} from './dogs-slider-config';

@Component({
  selector: 'app-dogs-slider',
  templateUrl: './dogs-slider.component.html',
  styleUrls: ['./dogs-slider.component.scss']
})
export class DogsSliderComponent implements OnInit {
  dogs: Dog[];
  showAll: null| boolean = null;

  constructor(
    private dogsSliderService: DogsSliderService
  ) { }

  ngOnInit(): void {
    const dogsSliderConfig = this.dogsSliderService.config.getValue();
    this.dogs = dogsSliderConfig.dogs;
    this.showAll = dogsSliderConfig.showAll;
    this.dogsSliderService.config.subscribe(value => {
      this.dogs = value.dogs;
      this.showAll = dogsSliderConfig.showAll;
    })
  }

  chooseTab(id: number | null = null): void{
    this.dogsSliderService.chosenDog.next(id);
  }
}
