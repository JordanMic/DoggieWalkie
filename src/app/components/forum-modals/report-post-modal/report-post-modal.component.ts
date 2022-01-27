import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ForumService} from '../../../views/forum/service/forum.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReportPostModel} from './model/report-post-model';

@Component({
  selector: 'app-report-post-modal',
  templateUrl: './report-post-modal.component.html',
  styleUrls: ['../new-posts-modal/new-posts-modal.component.scss']
})
export class ReportPostModalComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: ReportPostModel,
              private forumService: ForumService,
              public dialogRef: MatDialogRef<ReportPostModalComponent>,
              public http: HttpClient) {
    this.form = new FormGroup({
      commentntary: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  cancel(): void{
    this.dialogRef.close();
  }

  add(): void {
    const value = {
      postId: this.data.postId,
      content: this.form.value.commentntary,
    };

    try {
      this.forumService.reportPost(value);
      this.dialogRef.close();
    } catch (error) {
      console.log(error);
    }
  }

}
