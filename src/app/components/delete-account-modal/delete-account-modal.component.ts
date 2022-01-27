import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';

export interface DeleteData{
  dogId: number;
}

@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.scss']
})
export class DeleteAccountModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: DeleteData,
              public http: HttpClient,
              public dialogRef: MatDialogRef<DeleteAccountModalComponent>){ }

  ngOnInit(): void {
  }

  async deleteAccount(): Promise<void>{
    try{
      await this.http.delete<void>('dog/' + this.data.dogId).toPromise();
      this.dialogRef.close();
    }
    catch (error){
      console.log(error);
    }
  }

  cancel(): void{
    this.dialogRef.close();
  }

}
