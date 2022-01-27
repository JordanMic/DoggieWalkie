import { Component, Inject, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {DogListProfilesModel} from '../model/dog-list-model';



@Component({
    selector: 'app-dog-tile',
    templateUrl: './dog-tile.component.html',
    styleUrls: ['./dog-tile.component.scss']
  })

  export class DogTileComponent implements OnInit{

    @Input() dog: DogListProfilesModel ;
    @Output() favouriteEvent = new EventEmitter<DogListProfilesModel>();

    constructor(){

    }

    ngOnInit(): void {
    }

  // tslint:disable-next-line:typedef
    markAsFavourite() {
      this.dog.favourite = !this.dog.favourite;
      this.favouriteEvent.emit(this.dog);
    }
  }
