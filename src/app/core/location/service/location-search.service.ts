import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {District, Town, Voivodeship} from '../model/location';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationSearchService {

  constructor(
    private http: HttpClient
  ) { }

  findAllVoivodeship(): Observable<Voivodeship[]> {
    const subject = new Subject<Voivodeship[]>()
    this.http.get<Voivodeship[]>('/voivodeship').subscribe(
      value => {
        subject.next(value)
      },
      error => {
        console.log(error)
      }
    );
    return subject.asObservable();
  }

  findAllDistricts(voivodeshipId: number) {
    const subject = new Subject<District[]>()
    this.http.get<District[]>('/voivodeship/' + voivodeshipId).subscribe(
      value => {
        subject.next(value)
      },
      error => {
        console.log(error)
      }
    );
    return subject.asObservable();
  }

  findAllTowns(voivodeshipId: number, districtId: number) {
    const subject = new Subject<Town[]>()
    this.http.get<Town[]>('/voivodeship/' + voivodeshipId + '/district/' + districtId).subscribe(
      value => {
        subject.next(value)
      },
      error => {
        console.log(error)
      }
    );
    return subject.asObservable();
  }

  searchTown(townName: string) {
    const subject = new Subject<Town[]>()
    this.http.get<Town[]>('/search/town/' + townName).subscribe(
      value => {
        subject.next(value)
      },
      error => {
        console.log(error)
      }
    );
    return subject.asObservable();
  }
}
