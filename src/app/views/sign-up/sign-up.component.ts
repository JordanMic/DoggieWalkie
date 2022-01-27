import { ApiService } from '../../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterErrorResponse } from 'src/app/services/api/api-endpoints/auth/auth.d';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  check = true;
  warning = false;
  danger = false;
  confirm = false;
  error: string;

  loginFormControl = new FormControl('', [Validators.required]);

  form: FormGroup;
  constructor(private api: ApiService, private router: Router ) {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  chceckPassword(): void{
    this.hideDanger();
    this.hideDangerConfirm();
    this.hideWarning();

    if (this.form.value.confirmPassword === this.form.value.password){
      this.onClick();
    }
    else{
      this.showDangerConfirm();
      this.form.reset();
    }
  }


  ngOnInit(): void {
  }


  showWarning(): void{
    this.hideDanger();
    this.hideDangerConfirm();
    this.warning = true;
  }

  showDanger(): void{
    this.danger = true;
  }

  showDangerConfirm(): void{
    this.confirm = true;
  }

  hideDanger(): void{
    this.danger = false;
  }

  hideWarning(): void{
    this.warning = false;
  }

  hideDangerConfirm(): void{
    this.confirm = false;
  }

  goToPrivacy(): void{
    this.router.navigate(['privacy']);
  }

  goToTerms(): void{
    this.router.navigate(['terms']);
  }

  // tslint:disable-next-line:typedef
  async onClick(){
    if (this.form.valid){
      try {
        await this.api.auth.register({
          username: this.form.value.login,
          email: this.form.value.email,
          password: this.form.value.confirmPassword
        });
        this.router.navigate(['sign-up-success']);
      } catch (error) {
        const httpError = error as IRegisterErrorResponse;
        console.log(error.error.reason);
        if(error.status === 403){
          this.error = 'Podałeś błędne dane logowania';
        }
        else {
          this.error = error.error.reason;
        }
        throw error;
      }
    }
  }
  goToSignIn(): void{
    this.router.navigate(['sign-in']);
  }
}

