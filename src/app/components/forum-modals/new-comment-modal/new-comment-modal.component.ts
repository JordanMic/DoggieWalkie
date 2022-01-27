import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NewPostModel} from '../new-posts-modal/model/new-post-model';
import {ForumService} from '../../../views/forum/service/forum.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewCommentModel} from './model/new-comment-model';

@Component({
  selector: 'app-new-comment-modal',
  templateUrl: './new-comment-modal.component.html',
  styleUrls: ['./new-comment-modal.component.scss']
})
export class NewCommentModalComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: NewCommentModel,
              private forumService: ForumService,
              public dialogRef: MatDialogRef<NewCommentModalComponent>,
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

  add(): void{
    const value = {
      content: this.form.value.commentntary,
      postId: this.data.postId
    };

    try{
      this.forumService.newComment(value);
      this.dialogRef.close();
    }
    catch (error){
      console.log(error);
    }
  }
}
