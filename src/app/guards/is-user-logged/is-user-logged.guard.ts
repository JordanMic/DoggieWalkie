import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {ApiService} from '../../services/api/api.service';
import {UserService} from '../../core/user/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsUserLoggedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private api: ApiService) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
    if (this.userService.isLogged()){
      return true;
    }else if (this.userService.isLogged() === false){
      this.router.navigate(['sign-in']);
      return false;
    }else {
      return false;
    }
  }
}
