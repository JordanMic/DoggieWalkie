import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DogsWalkService} from '../../../views/dog-walks-list/service/dog-walk-requests-list.service';

export interface AcceptData {
  proposalId: number;
  requestId: number;
  userName: string;
  timesStart: string;
  timesEnd: string;
  startDate: string;
}

@Component({
  selector: 'app-accept-modal',
  templateUrl: './accept-modal.component.html',
  styleUrls: ['./accept-modal.component.scss']
})
export class AcceptModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: AcceptData,
              private dogsWalkService: DogsWalkService,
              public dialogRef: MatDialogRef<AcceptModalComponent>
  ) { }

  ngOnInit(): void {
  }

  async accept(): Promise<void>{
    const dataValue = Object.values(this.data);
    const proposal = dataValue[0];
    const request = dataValue[1];

    try{
      await this.dogsWalkService.accept(proposal);
      this.dogsWalkService.getDogsProposals(request);
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
