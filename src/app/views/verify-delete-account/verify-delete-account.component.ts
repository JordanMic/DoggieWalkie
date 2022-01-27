import {Component, OnInit} from '@angular/core';
import {VerificationStatus} from './verification-status.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-verify-delete-account',
  templateUrl: './verify-delete-account.component.html',
  styleUrls: ['./verify-delete-account.component.scss']
})
export class VerifyDeleteAccountComponent implements OnInit {
  statuses = VerificationStatus;
  status: VerificationStatus = VerificationStatus.CONFIRM;
  private token: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.token = params.token;
      },
      error => {
        this.status = VerificationStatus.FAILED;
      }
    );
  }

  goToMainPage() {
    this.router.navigate([''])
  }

  deleteAccount() {
    this.status = VerificationStatus.PENDING;
    this.http.delete("base/account/verify", {params: {token: this.token}}).subscribe(value => {
      this.status = VerificationStatus.SUCCESS;
    }, error => {
      this.status = VerificationStatus.FAILED;
    })
  }
}
