import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DogsWalkService} from '../../../views/dog-walks-list/service/dog-walk-requests-list.service';

export interface RejectData {
  proposalId: number;
  requestId: number;
}

@Component({
  selector: 'app-reject-modal',
  templateUrl: './reject-modal.component.html',
  styleUrls: ['./reject-modal.component.scss']
})
export class RejectModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: RejectData,
              private dogsWalkService: DogsWalkService,
              public dialogRef: MatDialogRef<RejectModalComponent>
  ) { }

  ngOnInit(): void {
  }

  async reject(): Promise<void>{
    const dataValue = Object.values(this.data);
    const proposal = dataValue[0];
    const request = dataValue[1];

    try{
      await this.dogsWalkService.reject(proposal);
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
