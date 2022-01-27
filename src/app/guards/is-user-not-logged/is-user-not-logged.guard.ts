import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../../core/user/service/user.service';
import {ApiService} from '../../services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class IsUserNotLoggedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private api: ApiService) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    if (this.userService.isLogged() === false) {
      return true;
    } else {
      this.router.navigate(['dog-list']);
      return false;
    }
  }
}
