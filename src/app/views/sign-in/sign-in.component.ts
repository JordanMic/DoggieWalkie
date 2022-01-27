import { ApiService } from '../../services/api/api.service';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ILoginErrorResponse, ILoginResponse} from 'src/app/services/api/api-endpoints/auth/auth.d';
import {UserService} from '../../core/user/service/user.service';
import {LoginModel} from './model/login-model';
import {SignInService} from './service/sign-in.service';
import {UserData} from '../../core/user/model/user-data';
import {ConfigService} from '../../services/config/config.service';
import {MatDialog} from '@angular/material/dialog';
import {PasswordRemaindModalComponent} from '../../components/password-remaind-modal/password-remaind-modal.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  danger = false;
  warning = false;
  error: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private userService: UserService,
    private signInService: SignInService,
    private config: ConfigService,
    private matDialog: MatDialog
  ) {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.userService.get().subscribe(value => {

    });
  }

  get login(): AbstractControl {
    return this.form.get('login') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  redirectTo(uri: string): void{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
 }


  onClick(): void{ // to async
    const formValue = this.form.value as LoginModel;

    this.signInService.login(formValue).toPromise<UserData>()
        .then(value => {
          this.userService.reportUser(value);

          this.redirect(Boolean(value.userData));
        })
      .catch(reason => {
        if(reason.status === 403){
          this.error = 'Użytkownik o podanym loginie nie istnieje lub hasło jest nieprawidłowe';
        }
        else {
          this.error = reason.error.reason;
        }
      });
  }

  getErrorLoginMessage(): string{
    if (this.login.hasError('required')) {
      return 'Pole nie może być puste';
    }

    return 'Nieznany błąd';
  }

  getErrorPasswordMessage(): string{
    if (this.password.hasError('required')) {
      return 'Pole nie może być puste';
    }

    return 'Nieznany błąd';
  }
  goToSignUp(): void {
    this.router.navigate(['sign-up']);
  }

  private redirect(createdProfile: boolean): void {
      if (createdProfile) {
        this.router.navigate(['dog-list']);
      } else {
        this.config.canCreateUserProfile = true;
        this.router.navigate(['create-user-profile', 'step-one']);
      }
  }

  openPasswordRemind() {
    this.matDialog.open(PasswordRemaindModalComponent)
  }
}
