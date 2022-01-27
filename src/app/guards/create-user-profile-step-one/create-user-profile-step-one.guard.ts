import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ConfigService} from '../../services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class CreateUserProfileStepOneGuard implements CanActivate {
  constructor(private config: ConfigService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.config.canCreateUserProfile){
      return true;
    }else {
      this.router.navigate(['sign-in']);
      return false;
    }
  }

}
