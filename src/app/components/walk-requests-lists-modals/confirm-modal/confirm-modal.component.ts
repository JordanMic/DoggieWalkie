import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DogsWalkService} from '../../../views/dog-walks-list/service/dog-walk-requests-list.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface AcceptData {
  userName: string;
  requestID: number;
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  form: FormGroup;
  currentRate = 3;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: AcceptData,
              private dogsWalkService: DogsWalkService,
              public dialogRef: MatDialogRef<ConfirmModalComponent>,
              public http: HttpClient){
    this.form = new FormGroup({
      reviewAboutTheUser: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void>{
    const dataValue = Object.values(this.data);
    const request = dataValue[1];

    const value = {
      ratingOfTheUser: this.currentRate,
      requestId: request,
      reviewAboutTheUser: this.form.value.reviewAboutTheUser
    };

    try {
      await this.dogsWalkService.rate(value);
      this.dogsWalkService.confirm(request);
      this.dialogRef.close();
    }
    catch (error){
      console.log(error);
    }

  }

  cancel(): void{
    this.dialogRef.close();
  }
}
