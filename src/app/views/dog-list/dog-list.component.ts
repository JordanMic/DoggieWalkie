import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {UserService} from '../../core/user/service/user.service';
// @ts-ignore
import {ITown} from './../../services/api/api-endpoints/voivodeship/voivodeship';
import {DogListService} from './service/dog-list.service';
import {DogSearchModel} from './model/dog-search-model';
import {DogListProfilesModel} from './model/dog-list-model';
import {LocationSearchService} from '../../core/location/service/location-search.service';
import {Town} from '../../core/location/model/location';


@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})

export class DogListComponent implements OnInit {
  townId = 0;
  options: Town[] = [];



  public dogs: DogListProfilesModel [] = [];
  public visibleDogs: DogListProfilesModel [] = [];
  public searchText = '';
  public dogSearchData: DogSearchModel;
  public page = 1;
  public sizeOfPage = 100;
  public filterByFavourite = false;
  public dogCountText = '';
  public showTown = '';
  public totalDogsCount = 0;
  public displayedMaxNumber = 12;
  public hiddenDogs = 4;
  public showMoreIncrement = 6;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private dogListApi: DogListService,
    private locationSearchService: LocationSearchService
  ) { }

  async ngOnInit(): Promise<void> {

      try{
        // @ts-ignore
        this.townId = this.userService.getUserData().userData.town.id;
        this.dogs = (await this.dogListApi.dogList( this.dogSearchData = {
          page: 0,
          sizeOfPage: 12,
          towns: [this.townId],
          districts: [],
          voivodeships: []
        })).profilesListModels;
    }catch (error){
    }
      // @ts-ignore
    let userData = this.userService.getUserData().userData;
      if (userData != null ) {
        let town: Town = {
          id: userData.town.id,
          name: userData.town.name,
          districtName: userData.district.name,
          voivodeshipName: userData.voivodeship.name
        }
        this.showTown = this.getTownName(town);
      }
    this.refreshResults();
  }

  async search(searchValue: string): Promise<void> {
    if (searchValue.length > 3) {
      this.locationSearchService.searchTown(searchValue).subscribe(value => {
        this.options = value;
      })
    } else {
      this.options = [];
    }
  }

   onSearch(event: any) {
    this.searchText = (event.target as HTMLInputElement).value;
    this.search(this.searchText)
   }

   private refreshResults(): void{
    this.visibleDogs = this.dogs.filter(x => x.dogName
      && (this.filterByFavourite ? x.favourite : true));

    if (this.visibleDogs.length >= this.displayedMaxNumber) {
      this.hiddenDogs = this.visibleDogs.length - this.displayedMaxNumber;
      this.visibleDogs = this.visibleDogs.slice(0, this.displayedMaxNumber);
    } else {
      this.hiddenDogs = 0;
    }
    this.refreshText();
   }

   public onMarkedFavourite(event: DogListProfilesModel ): void {
    const favouriteDog = this.dogs.find(x => x.id === event.id);

    if (favouriteDog != null) {
      this.dogListApi.updateFavorite(favouriteDog.id, favouriteDog.favourite);
      const index = this.dogs.indexOf(favouriteDog as DogListProfilesModel );
      this.dogs[index] = favouriteDog;
    }
   }

   public toggleFavourite(): void {
     this.filterByFavourite = !this.filterByFavourite;
     this.refreshResults();
  }

  public showMore(): void {
    this.displayedMaxNumber += this.showMoreIncrement;
    this.refreshResults();
  }

  private refreshText(): void {
    const count = this.visibleDogs.length;
    let noun = '';

    if (count === 1) {
      noun = 'pies';
    }
    else if ([2, 3, 4].includes(count)) {
      noun = 'psy';
    } else {
      noun = 'psów';
    }

    this.dogCountText = `${noun} na liście`;
  }

  async selectTown(town: Town) {
    try {
      this.showTown = this.searchText;
      this.dogSearchData.towns = [town.id];
      this.dogs = (await this.dogListApi.dogList(this.dogSearchData)).profilesListModels;
      this.showTown = this.getTownName(town);
      this.options = []
    }
    catch (error){
      console.error(error);
      this.showTown = 'nie znaleziono takiego miasta';
    }

    this.refreshResults();
  }

  getTownName(town: Town) {
    return town.voivodeshipName + " - " + town.districtName + " - " + town.name;
  }
}
