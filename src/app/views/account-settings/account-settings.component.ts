import { Component, OnInit } from '@angular/core';
import {FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective, NgForm,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../core/user/service/user.service';
import {AccountSettingsModel} from './model/account-settings-model';
import {ErrorStateMatcher} from '@angular/material/core';
import {DeleteAccountModalComponent} from "../../components/delete-account-modal/delete-account-modal.component";
import {UserDeleteComponent} from "../../components/user-delete-account-modal/User-delete/user-delete.component";
import {SuccesSettingModalComponent} from "../../components/succes-setting-modal/succes-setting-modal.component";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // @ts-ignore
    const invalidCtrl = !!(control.touched && control.invalid && control.parent?.dirty);
    // @ts-ignore
    const invalidParent = !!(control.parent.dirty && control.parent.invalid && control.parent && control.touched);

    return (invalidCtrl || invalidParent);
  }
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
    selector: 'account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss', '../shared/profile/profile.scss']
})
export class AccountSettingsComponent implements OnInit {

    myForm: FormGroup;
    matcher = new MyErrorStateMatcher();

  public accountSettings: AccountSettingsModel = {
      oldPassword: '',
      newPassword: ''
    };

    constructor(
      private router: Router,
      private http: HttpClient,
      private formBuilder: FormBuilder,
      private dialog: MatDialog,
      private userService: UserService) {
      this.myForm = this.formBuilder.group({
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['']
      }, { validator: this.checkPasswords });
    }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

    ngOnInit(): void {
    }

  save(): void{
    const profileData = this.accountSettings;

    const value = {
      newPassword: profileData.newPassword,
      oldPassword: profileData.oldPassword,
    };

    this.http.put('base/password', value).toPromise();
    this.myForm.reset();
    this.dialog.open(SuccesSettingModalComponent);
  }

  async delete(): Promise<void>{
    this.dialog.open(UserDeleteComponent, {
      width: 'auto',
      height: 'auto',
    }).afterClosed().subscribe(resulst => {
      window.location.reload();
    });
  }
}
