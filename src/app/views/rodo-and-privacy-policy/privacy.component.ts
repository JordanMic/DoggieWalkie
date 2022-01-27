import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {QuestionModalComponent} from '../../components/FAQModal/question-modal/question-modal.component';
import {BugModalComponent} from "../../components/FAQModal/bug-modal/bug-modal.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
  }
}
