import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  DogWalkProposal,
  DogWalkProposalResponse,
  DogWalkRequest, DogWalkRow
} from '../models/dog-walk-request.model';
import {RateUserModel} from "../../../components/walk-requests-lists-modals/confirm-modal/Model/rateUser-model";
import {RateDogModel} from "../../../components/walk-requests-lists-modals/confirm-dog-modal/model/rate-dog-model";

@Injectable({
  providedIn: 'root'
})
export class DogsWalkService{

  private walkingList$: BehaviorSubject<DogWalkRequest> = new BehaviorSubject<DogWalkRequest>([]);
  private walkingProposals$: BehaviorSubject<DogWalkProposalResponse> = new BehaviorSubject<DogWalkProposalResponse>({
    requestId: null,
    proposals: []
  });

  constructor(
    private http: HttpClient
  ) { }

  public getLastWalkingListValue(): DogWalkRequest | null{
    return this.walkingList$.getValue();
  }

  public getLastWalkingProposalValue(): DogWalkProposalResponse | null{
    return this.walkingProposals$.getValue();
  }


  public getWalkingListAsObservable(): Observable<DogWalkRequest>{
    return this.walkingList$.asObservable();
  }

  public getWalkingProposalsAsObservable(): Observable<DogWalkProposalResponse>{
    return this.walkingProposals$.asObservable();
  }

  getDogsWalk(dogProfileId: number): void {
    this.http.get<DogWalkRequest>(`request/${dogProfileId}`).subscribe(value => {
      const sortedValues = value.sort((a, b) => new Date(a.dateStart) > new Date(b.dateStart) ? 1 : -1);
      this.walkingList$.next(sortedValues);
    });
  }

  getHistory(dogProfileId: number): void {
    this.http.get<DogWalkRequest>(`/request/history/${dogProfileId}`).subscribe(value => {
      const sortedValues = value.sort((a, b) => new Date(a.dateStart) > new Date(b.dateStart) ? 1 : -1);
      this.walkingList$.next(sortedValues);
    });
  }

  getDogsProposals(requestId: number): void {
    this.http.get<DogWalkProposal[]>(`proposal/${requestId}`).subscribe(value => {
      this.walkingProposals$.next({
        requestId,
        proposals: value
      });
    });
  }


  async accept(proposalId: number): Promise<void>{
    return this.http.put<void>('proposal/accept/' + proposalId, undefined).toPromise();
  }

  async rate(value: RateUserModel): Promise<void>{
    return this.http.put<void>('request/walk/feedback/user',  value, undefined).toPromise();
  }

  async confirm(proposalId: number): Promise<void>{
    return this.http.put<void>('request/history/' + proposalId, undefined).toPromise();
  }


  async reject(proposalId: number): Promise<void>{
   return this.http.put<void>('proposal/reject/' + proposalId, undefined).toPromise();
  }

}
