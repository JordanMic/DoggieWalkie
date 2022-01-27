import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-password-remaind-modal',
  templateUrl: './password-remaind-modal.component.html',
  styleUrls: ['./password-remaind-modal.component.scss']
})
export class PasswordRemaindModalComponent implements OnInit {
  send = false;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private httpClient: HttpClient,
    private matDialogRef: MatDialogRef<PasswordRemaindModalComponent>
  ) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    "Ups. Mail nie wygląda na prawidłowy"
  }

  sendMail() {
    if (this.email.valid) {
      this.httpClient.post("/auth/password/remind", {email: this.email.value}).subscribe(value => {
        this.send = true;
      })
    }
  }

  close() {
    this.matDialogRef.close()
  }
}
