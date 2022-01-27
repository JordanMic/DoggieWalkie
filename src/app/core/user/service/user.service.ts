import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserData, UserDataAdditional} from '../model/user-data';
import {StorageService} from '../../storage/service/storage.service';
import {StorageType} from '../../storage/utils/storage.enum';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private logged = false;
  private user = new BehaviorSubject<UserData | null>(null);

  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {
    const read = this.storageService.read<UserData>(StorageType.USER_DATA);
    this.user.next(read);
    this.setUpLogged(read);

    this.user.subscribe(value => {
      this.setUpLogged(value);
      if (value !== null) {
        this.storageService.write(StorageType.USER_DATA, value);
      } else {
        this.storageService.remove(StorageType.USER_DATA);
      }
    });
  }

  private setUpLogged(userData: null | UserData): void {
    if (null != userData && this.userLogged(userData)) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  }

  public reportUser(userData: UserData): void {
    console.log('reported');
    this.user.next(userData);
    this.logged = userData != null;
  }

  public isLogged(): boolean {
    return this.logged;
  }

  public getUserData(): UserData | null {
    const userData = this.user.getValue();

    return this.userLogged(userData) ? userData : null;
  }

  public updateUserData() {
    let userData = this.getUserData();
    if (null != userData) {
      this.http.get<UserDataAdditional>("/base/info").subscribe(value => {
        // @ts-ignore
        userData.userData = value;
        this.user.next(userData);
      })
    }
  }

  private userLogged(userData: UserData | null) {
    return userData !== null && userData.username !== undefined;
  }

  public get(): Observable<UserData | null> {
    return this.user;
  }

  public logout(): void {
    this.storageService.remove(StorageType.USER_DATA); // efekt uboczny
    this.logged = false; // to powinien byc getter sprawdzajacy wartosc w behaviorhSubject
    this.user.next(null);
  }


}
