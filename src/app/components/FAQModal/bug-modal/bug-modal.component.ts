import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {base64ToFile, ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';


@Component({
  selector: 'app-bug-modal',
  templateUrl: './bug-modal.component.html',
  styleUrls: ['./bug-modal.component.scss']
})
export class BugModalComponent implements OnInit {
  form: FormGroup;
  imageChangedEvent: any;
  private croppedImage: Blob;
  @ViewChild(ImageCropperComponent)
  imageCropper: ImageCropperComponent;

  constructor(
    public dialogRef: MatDialogRef<BugModalComponent>,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      contents: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  imageCropped(event: ImageCroppedEvent): void {
    if (event.base64) {
      this.croppedImage = base64ToFile(event.base64);
    }
  }

  imageLoaded(): void{

  }

  cropperReady(): void{

  }

  loadImageFailed(): void{

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  async onSubmit(): Promise<void>{
      const value = {
        contents: this.form.value.contents
      };
      this.http.post('/submissions/report/bug', value ).toPromise();
      this.dialogRef.close(true);

  }



}
