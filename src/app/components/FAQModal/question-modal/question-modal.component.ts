import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<QuestionModalComponent>,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      contents: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    const value = {
      contents: this.form.value.contents
    };

    this.http.post('/submissions/question', value ).toPromise();
    this.dialogRef.close(true);
  }

}
