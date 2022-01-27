import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {ForumService} from '../../../views/forum/service/forum.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewPostModel} from './model/new-post-model';

@Component({
  selector: 'app-new-posts-modal',
  templateUrl: './new-posts-modal.component.html',
  styleUrls: ['./new-posts-modal.component.scss']
})
export class NewPostsModalComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: NewPostModel,
              private forumService: ForumService,
              public dialogRef: MatDialogRef<NewPostsModalComponent>,
              public http: HttpClient) {
    this.form = new FormGroup({
      postTitle: new FormControl('', [Validators.required]),
      postDescription: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  cancel(): void{
    this.dialogRef.close();
  }

 add(): void{
    const value = {
      title: this.form.value.postTitle,
      content: this.form.value.postDescription,
      categoryId: this.data.categoryId
    };

    try{
      this.forumService.newPost(value);
      this.dialogRef.close();
    }
    catch (error){
      console.log(error);
    }
  }

}
