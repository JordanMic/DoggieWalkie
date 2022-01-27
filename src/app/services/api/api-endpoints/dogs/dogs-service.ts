import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IDog } from "src/app/models/sample";
import { of } from 'rxjs';
import { DogsMockedData } from "./dogs-mocked.data";

@Injectable({
    providedIn: 'root'
})

export class DogsService {

    constructor(private httpClient: HttpClient) { }

    getBasicData(): Observable<Array<IDog>> {
        return of(DogsMockedData.Dogs);
    }

    getDogById(id: string) : Observable<IDog>
    {
        return of(DogsMockedData.Dogs.find(x=> x.id == id) as IDog);
    }



}
