import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface PassData{
  err: string;
}

@Component({
  selector: 'app-error-proposal-modal',
  templateUrl: './error-proposal-modal.component.html',
  styleUrls: ['./error-proposal-modal.component.scss']
})
export class ErrorProposalModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: PassData,
              private matDialogRef: MatDialogRef<ErrorProposalModalComponent>
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.matDialogRef.close();
  }
}
