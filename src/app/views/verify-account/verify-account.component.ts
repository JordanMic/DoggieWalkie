import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VerificationStatus} from './verification-status.enum';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
  status = VerificationStatus.PENDING;
  statuses  = VerificationStatus;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const token = params.token;
        this.http.get("auth/register/verify", {params: {token: token}}).subscribe(value => {
          this.status = VerificationStatus.SUCCESS;
        }, error => {
          this.status = VerificationStatus.FAILED;
        })
      },
      error => {
        this.status = VerificationStatus.FAILED;
      }
    );
  }

  goToLoginPage() {
    this.router.navigate(['sign-in'])
  }

  goToMainPage() {
    this.router.navigate(['/'])
  }
}
