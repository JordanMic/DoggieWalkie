import { Injectable } from '@angular/core';
import {StorageType} from "../utils/storage.enum";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  public read<T>(key: StorageType): null | T {
    let item = localStorage.getItem(key);

    return null == item ? null : StorageService.parseToJson(item);
  }

  public write(key: StorageType, item: Object): void {
    localStorage.setItem(key, JSON.stringify(item));
  }

  public remove(key: StorageType): void {
    localStorage.removeItem(key);
  }

  private static parseToJson(item: string){
    return JSON.parse(item);
  }

}
