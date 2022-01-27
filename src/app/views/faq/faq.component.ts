import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {QuestionModalComponent} from '../../components/FAQModal/question-modal/question-modal.component';
import {BugModalComponent} from "../../components/FAQModal/bug-modal/bug-modal.component";
import {
  SuccessQuestionModalComponent
} from '../../components/FAQModal/success-question-modal/success-question-modal.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  goToAccountSettings(): void{
    this.router.navigate(['manage', 'account-settings']);
  }

  openQuestionModal(): void {
    this.dialog.open( QuestionModalComponent, {
      width: 'auto',
      height: 'auto',
    }).afterClosed().subscribe(value => {
      if(value === true) {
        this.dialog.open(SuccessQuestionModalComponent)
      }
    });
  }

  openBugModal(): void {
    this.dialog.open( BugModalComponent, {
      width: 'auto',
      height: 'auto',
    }).afterClosed().subscribe(value => {
      if (value === true) {
        this.dialog.open(SuccessQuestionModalComponent)
      }
    });
  }
}
