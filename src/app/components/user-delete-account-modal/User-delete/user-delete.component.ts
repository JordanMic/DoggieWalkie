import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {DeleteData} from '../../delete-account-modal/delete-account-modal.component';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {
form: FormGroup;

  constructor(
              public http: HttpClient,
              public dialogRef: MatDialogRef<UserDeleteComponent>) {
    this.form = new FormGroup({
      pass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  async deleteAccount(): Promise<void>{
    const value = {
      password: this.form.value.pass || ''
    };

    await this.http.request('delete', '/base/account', { body: value });
    this.dialogRef.close();
  }

  cancel(): void{
    this.dialogRef.close();
  }

}
