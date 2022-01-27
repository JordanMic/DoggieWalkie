import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification$ = new Subject<string>();

  getNotificationAsObservable(): Observable<string>{
    return this.notification$.asObservable();
  }

  addNote(note: string): void{
    this.notification$.next(note);
  }
  constructor() { }
}
