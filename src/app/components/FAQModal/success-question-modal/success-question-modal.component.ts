import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-success-question-modal',
  templateUrl: './success-question-modal.component.html',
  styleUrls: ['./success-question-modal.component.scss']
})
export class SuccessQuestionModalComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<SuccessQuestionModalComponent>
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.matDialogRef.close();
  }
}
