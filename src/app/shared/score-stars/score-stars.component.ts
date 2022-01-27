import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-score-stars',
  templateUrl: './score-stars.component.html',
  styleUrls: ['./score-stars.component.scss']
})
export class StarsComponent implements OnInit {
  @Input()
  score: number;

  constructor(
  ) { }

  ngOnInit(): void {
    
  }


}
