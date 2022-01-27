import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-succes-proposal-modal',
  templateUrl: './succes-proposal-modal.component.html',
  styleUrls: ['./succes-proposal-modal.component.scss']
})
export class SuccesProposalModalComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<SuccesProposalModalComponent>
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.matDialogRef.close();
  }
}
