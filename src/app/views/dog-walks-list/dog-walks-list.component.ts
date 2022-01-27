import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DogsSliderService} from '../../shared/dogs-slider/dogs-slider.service';
import {DogWalk, DogWalkProposal, DogWalkRequest, DogWalkRow, DogWalkStatusEnum} from './models/dog-walk-request.model';
import {NeedToWalkModalComponent} from '../../components/need-to-walk-modal/need-to-walk-modal.component';
import {DogsWalkService} from './service/dog-walk-requests-list.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AcceptModalComponent} from '../../components/walk-requests-lists-modals/accept-modal/accept-modal.component';
import {RejectModalComponent} from '../../components/walk-requests-lists-modals/reject-modal/reject-modal.component';
import {ConfirmModalComponent} from '../../components/walk-requests-lists-modals/confirm-modal/confirm-modal.component';
import {UserService} from '../../core/user/service/user.service';
import {SuccesNeedToWalkModalComponent} from "../../components/need-to-walk-modal/succes-need-to-walk-modal/succes-need-to-walk-modal.component";


@Component({
    selector: 'dog-walk-requests-list',
    templateUrl: './dog-walk-requests-list.component.html',
    styleUrls: ['./dog-walk-requests-list.component.scss',  '../shared/profile/profile.scss']
})
export class DogWalkRequestsListComponent implements OnInit {
  public score: number;
  public scored: number;
  // tslint:disable-next-line:max-line-length
    constructor(private dialog: MatDialog,  private dogsSliderService: DogsSliderService, private dogsWalkService: DogsWalkService, private userService: UserService, private router: Router) {
    }

    public dogWalks: DogWalkRow[] = [];
    public proposal: DogWalkProposal;


    dogId: null | number = null;

    static detectCurrentRowStatus(proposals: DogWalkProposal[]): DogWalkStatusEnum {
      if (proposals.find(({requestStatus}) => requestStatus === DogWalkStatusEnum.Completed)){
        return DogWalkStatusEnum.Completed;
      } else if (proposals.find(({requestStatus}) => requestStatus === DogWalkStatusEnum.Accepted)){
        return DogWalkStatusEnum.Accepted;
      } else if (proposals.find(({requestStatus}) => requestStatus === DogWalkStatusEnum.History)){
        return DogWalkStatusEnum.History;
      } else {
        return DogWalkStatusEnum.Waiting;
      }
    }

    public ngOnInit(): void {
      this.dogId = this.dogsSliderService.chosenDog.getValue();
      if (this.dogId){
        this.getDogWalk(this.dogId);
      }

      this.dogsSliderService.chosenDog.subscribe(value => {
        this.dogId = value;
        this.getDogWalk(value || 0);
      });

      this.dogsWalkService.getWalkingListAsObservable()
        .pipe(
          map<DogWalk[], DogWalkRow[]>(response => response.map(row => ({...row, showOffers: false, proposals: null})))
        )
        .subscribe(value => {
        this.dogWalks = value;
      });

      this.dogsWalkService.getWalkingProposalsAsObservable()
        .subscribe(value => {
          const index = this.dogWalks.findIndex(({requestId}) => requestId === value.requestId );
          if (index > -1){
            this.dogWalks[index].proposals = value.proposals.map(proposal => ({
              ...proposal,
              score: Math.ceil((proposal.sumOfRatings / (proposal.numberOfRatings || 1)) * 100) / 100
            }));
            this.dogWalks[index].status = DogWalkRequestsListComponent.detectCurrentRowStatus(value.proposals);
          }

        });

    }

    private getDogWalk(value: number): void {
      this.dogsWalkService.getDogsWalk(value);
    }

  private getProposalsForCurrentDog(requestId: number): void {
    this.dogsWalkService.getDogsProposals(requestId);
    this.score = this.proposal.sumOfRatings / this.proposal.numberOfRatings;
    console.log(this.score);
  }

    public openDropdown(row: DogWalkRow): void{
            row.showOffers = !row.showOffers;
            if (row.showOffers && row.proposals === null) {
            this.getProposalsForCurrentDog(row.requestId);
            }
    }

  // tslint:disable-next-line:max-line-length
    async accept(proposalId: number, requestId: number, userFirstName: string, timeStart: string, timeEnd: string, start: string | null): Promise<void>{
      this.dialog.open(AcceptModalComponent, {
        width: 'auto',
        height: 'auto',
        data: {
          proposalsId: proposalId,
          requestID: requestId,
          userName: userFirstName,
          timesStart: timeStart,
          timesEnd: timeEnd,
          startDate: start
        }
      });
    }

  async confirm(userFirstName: string, requestId: number): Promise<void>{
    this.dialog.open(ConfirmModalComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        userName: userFirstName,
        requestOd: requestId
      }
    }).afterClosed().subscribe(result => {
      this.dogsWalkService.getDogsWalk(this.dogId || 0);
    });
  }

    async reject(proposalId: number, requestId: number): Promise<void>{
      this.dialog.open(RejectModalComponent, {
        width: 'auto',
        height: 'auto',
        data: {
          proposalsId: proposalId,
          requestID: requestId,
        }
      });
    }

  async history(dogiId: number | null): Promise<void>{
    try{
      await this.dogsWalkService.getHistory(dogiId || 0);
    }
    catch (error){
      console.log(error);
    }
  }

  async getWalks(dogiId: number | null): Promise<void>{
    try{
      await this.dogsWalkService.getDogsWalk(dogiId || 0);
    }
    catch (error){
      console.log(error);
    }
  }

  goToProfile(userId: number): void{
      this.router.navigate(['user', userId]);
  }

  open(): void{
    this.dialog.open(NeedToWalkModalComponent).afterClosed().subscribe(result => {
      this.dogsWalkService.getDogsWalk(this.dogId || 0);
      this.userService.updateUserData();

      if (result === true){
        this.dialog.open(SuccesNeedToWalkModalComponent);
      }
    });
  }

  openChat(proposal: DogWalkProposal) {
    this.router.navigate(['messages', proposal.messageThread])
  }
}
