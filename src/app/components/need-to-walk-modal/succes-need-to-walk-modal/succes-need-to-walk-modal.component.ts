import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-succes-need-to-walk-modal',
  templateUrl: './succes-need-to-walk-modal.component.html',
  styleUrls: ['./succes-need-to-walk-modal.component.scss']
})
export class SuccesNeedToWalkModalComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<SuccesNeedToWalkModalComponent>
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.matDialogRef.close();
  }

}
