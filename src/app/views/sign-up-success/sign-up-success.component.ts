import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-success',
  templateUrl: './sign-up-success.component.html',
  styleUrls: ['./sign-up-success.component.scss']
})
export class SignUpSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToSignIn(): void{
    this.router.navigate(['sign-in']);
  }

}
