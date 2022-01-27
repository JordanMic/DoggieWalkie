import { Injectable } from '@angular/core';
import {UserProfileModel} from '../../../views/user-profile/model/user-profile-model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../core/user/service/user.service';
import {Router} from '@angular/router';
import {apiErrorHandler} from '../../../services/api/helpers/api-error-handler';
import {ProposalModel} from '../model/proposal-model';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private proposal: ProposalModel;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) { }

  getModel(): ProposalModel{
    return this.proposal;
  }

  sendProposal(proposalData: ProposalModel): Promise<void> {
    try {
      return this.httpClient.post<void>('/proposal', JSON.stringify(proposalData)).toPromise();
    } catch (error) {
      apiErrorHandler(error as HttpErrorResponse, this.router, this.userService);
      throw error;
    }
  }
}
