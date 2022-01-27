import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MyPackModel} from '../model/my-pack-model';
import {NeedToWalkModalComponent} from "../../need-to-walk-modal/need-to-walk-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../core/user/service/user.service";
import {SuccesNeedToWalkModalComponent} from "../../need-to-walk-modal/succes-need-to-walk-modal/succes-need-to-walk-modal.component";

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DogCardComponent implements OnInit {
  @Input() dog: MyPackModel ;

  constructor(private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
  }

  open(): void {
    this.dialog.open(NeedToWalkModalComponent, {
      data: this.dog
    }).afterClosed().subscribe(result => {
      this.userService.updateUserData();
      if(result === true){
        this.dialog.open(SuccesNeedToWalkModalComponent);
      }
    });
  }
}
