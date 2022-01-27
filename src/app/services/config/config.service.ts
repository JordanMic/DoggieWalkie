import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private canCreateUserProfileVariable = false;
  private canCreateDogProfileVariable = false;

  get canCreateUserProfile(): boolean {
    return this.canCreateUserProfileVariable;
  }

  set canCreateUserProfile(value: boolean) {
    this.canCreateUserProfileVariable = value;
  }

get canCreateDogProfile(): boolean {
    return this.canCreateDogProfileVariable;
  }

set canCreateDogProfile(value: boolean) {
    this.canCreateDogProfileVariable = value;
  }
}
