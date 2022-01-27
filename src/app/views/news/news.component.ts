import { PopupToCreateDogComponent } from './../../components/popup-to-create-dog/popup-to-create-dog.component';
import { Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(PopupToCreateDogComponent);
  }



}
