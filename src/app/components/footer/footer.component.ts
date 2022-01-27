import { Component, OnInit } from '@angular/core';
import {BugModalComponent} from '../FAQModal/bug-modal/bug-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToFaq(): void{
    this.router.navigate(['FAQ']);
  }

  openBugModal(): void {
    this.dialog.open( BugModalComponent, {
      width: '50%',
      height: '51%',
    });
  }

}
