import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DogsSliderService} from '../../shared/dogs-slider/dogs-slider.service';
import {NeedToTalkModel} from './model/need-to-talk-model';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MyPackModel} from '../my-pack/model/my-pack-model';

@Component({
  selector: 'app-need-to-walk-modal',
  templateUrl: './need-to-walk-modal.component.html',
  styleUrls: ['./need-to-walk-modal.component.scss']
})
export class NeedToWalkModalComponent implements  OnInit{
  id: number;
  image: string | ArrayBuffer | null;
  public dogs: any;
  applications: {id: number}[] = [{
    id: 0
  }];

  form: FormGroup;

  ngOnInit(): void {
    if (this.data){
      console.log(this.data);
      this.form.controls.dogs.setValue([this.data.dogProfileId]);
    }
  }


  constructor(@Inject(MAT_DIALOG_DATA)
    public data: MyPackModel | undefined,
              private http: HttpClient,
              private router: Router,
              private dialog: MatDialog,
              private dogSliderService: DogsSliderService,
              private dogsSliderService: DogsSliderService,
              public dialogRef: MatDialogRef<NeedToWalkModalComponent>
  ) {

    this.form = new FormGroup({
      dogs: new FormControl([], [Validators.required]),
      description: new FormControl('' ),
      row0: this.getRowGroup()
    });

    const dogsSliderConfig = this.dogsSliderService.config.getValue();
    this.dogs = dogsSliderConfig.dogs;
  }

  getValidationInfo(controlGroup: string): boolean {
    return (this.form.controls[controlGroup] as FormGroup).invalid && (this.form.controls[controlGroup] as FormGroup).controls.endTime.touched;
}

  getValidationDateError(controlGroup: string): string {
    return (this.form.controls[controlGroup] as FormGroup).errors?.dateValidatorError || '';
  }

  getRowGroup = (): FormGroup => new FormGroup({
    date: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required])
}, [this.dateValidator])

  dateValidator({value: {startTime, endTime}}: AbstractControl): ValidationErrors | null {
    const now = new Date();
    const start = startTime !== '' ? startTime : '00:00';
    const end = endTime !== '' ? endTime : '00:00';
    const [startHours, startMinutes] =   start.split(':');
    const [endHours, endMinutes] =  end.split(':');
    const validatorErrorObj = {dateValidatorError: 'Godzina zakończenia nie może być mniejszy'};
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHours, startMinutes) < new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHours, endMinutes) ? null : validatorErrorObj;
  }

  onSubmit = (): void => {
    const {valid, value} = this.form;
    if (valid){

      const {dogs, description, ...rest} = value;

      const arrayWithValues = Object.values(rest);

      const rebuildedData: NeedToTalkModel = {
    dateEnd: arrayWithValues.map((row: any) => {
      const currentDate = new Date(row.date);
      const [hours, minutes] = row.endTime.split(':');
      const rebuilded = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, hours - 23, minutes).toISOString();
      return rebuilded;
    }),
    dateStart: arrayWithValues.map((row: any) => {
      const currentDate = new Date(row.date);
      const [hours, minutes] = row.startTime.split(':');
      const rebuilded = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, hours - 23, minutes).toISOString();
      return rebuilded;
    }),
    description,
    dogProfile: dogs
  };

      this.http.post('/request', rebuildedData).subscribe( result => {
        this.dialogRef.close(true);
      });
    }
  }


  addNewApplication(e: Event): void{
    e.preventDefault();
    const elementsLength = this.applications.length;
    const id = this.applications[elementsLength - 1].id + 1;
    this.applications.push({id});
    const rowName = `row${id}`;

    this.form.addControl(rowName, this.getRowGroup());
  }

  deleteNewApplication(e: Event , id: number): void{
    e.preventDefault();
    this.applications = this.applications.filter(({id: currentId}) => id !== currentId);

    const rowName = `row${id}`;

    this.form.removeControl(rowName);
  }



}

