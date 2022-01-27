import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DogWalksListModel} from '../../views/dog-profile/model/dog-walks-list-model';
import {RangeType} from 'ngx-mat-range-slider/lib/ngx-mat-range-slider.component';
import {FormControl, FormGroup} from '@angular/forms';
import {ProposalModel} from './model/proposal-model';
import {ProposalService} from './service/proposal.service';

interface IWalkData {
  dogName: string;
  walk: DogWalksListModel; }

@Component({
  selector: 'app-proposal-modal',
  templateUrl: './proposal-modal.component.html',
  styleUrls: ['./proposal-modal.component.scss']
})
export class ProposalModalComponent implements OnInit {
  mainColor = 'blue';
  form: FormGroup;
  public startTime: number;
  endTime: number;
  value: RangeType = {
    min: 0,
    max: 0
  };

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: IWalkData,
              private proposalService: ProposalService,
              public dialogRef: MatDialogRef<ProposalModalComponent>
              ) {
    this.startTime = new Date(this.data.walk.dateStart).valueOf(); // toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    this.endTime = new Date(this.data.walk.dateEnd).valueOf();
    this.value = {
      min: this.startTime,
      max: this.endTime
    };
    this.form = new FormGroup({
      description: new FormControl(''),
    });
  }

  setValue(e: RangeType): void{
    this.value = e;
  }

  formatLabel = (value: number): string => {
    const date = new Date(value);
    const hour = date.getHours();
    let minutes: string | number = date.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hour}:${minutes}`;
  }

  async onSubmit(): Promise<void> {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const start = (new Date(this.value.min - tzoffset)).toISOString().slice(0, -1);
    const end = (new Date(this.value.max - tzoffset)).toISOString().slice(0, -1);
    const proposalValue: ProposalModel = {
        dateStart: start,
        dateEnd: end,
        description: this.form.value.description,
        requestId: this.data.walk.requestId
    };
    try{
      await this.proposalService.sendProposal(proposalValue);
      this.dialogRef.close(true);
    }catch (error){
      this.dialogRef.close(error.error.reason);
    }
}

  ngOnInit(): void {
  }

}
