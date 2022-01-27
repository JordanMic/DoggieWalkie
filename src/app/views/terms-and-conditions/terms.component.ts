import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {QuestionModalComponent} from '../../components/FAQModal/question-modal/question-modal.component';
import {BugModalComponent} from "../../components/FAQModal/bug-modal/bug-modal.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
  }
}
