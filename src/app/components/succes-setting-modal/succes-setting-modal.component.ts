import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-succes-setting-modal',
  templateUrl: './succes-setting-modal.component.html',
  styleUrls: ['./succes-setting-modal.component.scss']
})
export class SuccesSettingModalComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<SuccesSettingModalComponent>
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.matDialogRef.close();
  }

}
