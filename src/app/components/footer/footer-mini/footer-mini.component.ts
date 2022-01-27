import { Component, OnInit } from '@angular/core';
import {BugModalComponent} from '../../FAQModal/bug-modal/bug-modal.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-footer-mini',
  templateUrl: './footer-mini.component.html',
  styleUrls: ['./footer-mini.component.scss']
})
export class FooterMiniComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  goToFaq(): void{
    this.router.navigate(['FAQ']);
  }

  openBugModal(): void {
    this.dialog.open( BugModalComponent, {
      width: 'auto',
      height: 'auto',
    });
  }

}
