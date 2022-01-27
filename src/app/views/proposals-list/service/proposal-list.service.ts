import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProposalPageModel} from '../model/proposal-page-model';
import {UserService} from '../../../core/user/service/user.service';
import {RateDogModel} from "../../../components/walk-requests-lists-modals/confirm-dog-modal/model/rate-dog-model";

@Injectable({
  providedIn: 'root'
})
export class ProposalListService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  async getProposalList(): Promise<ProposalPageModel> {
    const userId = this.userService.getUserData()?.userBaseId;
    try {
      return await this.http.get<ProposalPageModel>(`proposal/list/user/` + userId).toPromise();
    }
      catch (error){
        throw error;
      }
  }

  async getHistoryProposalList(): Promise<ProposalPageModel> {
    const userId = this.userService.getUserData()?.userBaseId;
    try {
      return await this.http.get<ProposalPageModel>(`proposal/list/history/user/` + userId).toPromise();
    }
    catch (error){
      throw error;
    }
  }

  async rateDog(value: RateDogModel): Promise<void>{
    return this.http.put<void>('request/walk/feedback/dog',  value, undefined).toPromise();
  }

  async confirmDog(proposalId: number): Promise<void>{
    return this.http.put<void>('proposal/history/' + proposalId, undefined).toPromise();
  }
}
