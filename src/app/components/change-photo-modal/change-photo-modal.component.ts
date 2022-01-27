import {Component, OnInit, ViewChild} from '@angular/core';
import {base64ToFile, ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-photo-modal',
  templateUrl: './change-photo-modal.component.html',
  styleUrls: ['./change-photo-modal.component.scss']
})
export class ChangePhotoModalComponent implements OnInit {
  imageChangedEvent: any;
  private croppedImage: Blob;
  @ViewChild(ImageCropperComponent)
  imageCropper: ImageCropperComponent;

  constructor(
    public dialogRef: MatDialogRef<ChangePhotoModalComponent>
  ) { }

  ngOnInit(): void {
  }

  imageCropped(event: ImageCroppedEvent): void {
    if (event.base64) {
      this.croppedImage = base64ToFile(event.base64);
    }
  }

  imageLoaded() {

  }

  cropperReady() {

  }

  loadImageFailed() {

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  returnPhoto() {
    this.dialogRef.close(this.croppedImage);
  }
}
