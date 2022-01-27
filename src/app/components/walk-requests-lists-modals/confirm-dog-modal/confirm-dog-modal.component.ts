import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DogsWalkService} from '../../../views/dog-walks-list/service/dog-walk-requests-list.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {ProposalListService} from '../../../views/proposals-list/service/proposal-list.service';

export interface AcceptDogData {
  userName: string;
  requestID: number;
  proposalId: number;
}

@Component({
  selector: 'app-confirm-dog-modal',
  templateUrl: './confirm-dog-modal.component.html',
  styleUrls: ['./confirm-dog-modal.component.scss']
})
export class ConfirmDogModalComponent implements OnInit {


  form: FormGroup;
  currentRate = 3;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: AcceptDogData,
              private proposalService: ProposalListService,
              public dialogRef: MatDialogRef<ConfirmDogModalComponent>,
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
    const proposal = dataValue[2];


    const value = {
      ratingOfTheDog: this.currentRate,
      requestId: request,
      reviewAboutTheDog: this.form.value.reviewAboutTheUser
    };

    try {
      await this.proposalService.rateDog(value);
      await this.proposalService.confirmDog(proposal);
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
