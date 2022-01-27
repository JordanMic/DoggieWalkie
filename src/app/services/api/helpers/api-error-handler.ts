import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../../../core/user/service/user.service';

export const apiErrorHandler = (error: HttpErrorResponse, router: Router, userService: UserService) => {
  if (error.status === 401)
  {
    userService.logout();
    router.navigate(['sign-in']);
  }
  if(error.status === 500){
    router.navigate(['not-found']);
  }
};
