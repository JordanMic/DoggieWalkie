import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NewPostModel} from '../new-posts-modal/model/new-post-model';
import {ForumService} from '../../../views/forum/service/forum.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReportCommentModel} from './model/report-comment-model';

@Component({
  selector: 'app-report-comment-modal',
  templateUrl: './report-comment-modal.component.html',
  styleUrls: ['../new-posts-modal/new-posts-modal.component.scss']
})
export class ReportCommentModalComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: ReportCommentModel,
              private forumService: ForumService,
              public dialogRef: MatDialogRef<ReportCommentModalComponent>,
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
      commentId: this.data.commentId,
      content: this.form.value.commentntary,
    };

    try {
      this.forumService.reportComment(value);
      this.dialogRef.close();
    } catch (error) {
      console.log(error);
    }
  }

}
