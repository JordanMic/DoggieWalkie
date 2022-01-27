import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api/api.service';
import {DogProfileService} from './service/dog-profile.service';
import {DogProfileModel} from './model/dog-profile-model';
import {MatDialog} from '@angular/material/dialog';
import {ProposalModalComponent} from '../../components/proposal-modal/proposal-modal.component';
import {DogWalksListModel} from './model/dog-walks-list-model';
import {DogProfileOpinionModel} from './model/dog-profile-opinion-model';
import {SuccesProposalModalComponent} from "../../components/proposal-modal/succes-proposal-modal/succes-proposal-modal.component";
import {ErrorProposalModalComponent} from "../../components/proposal-modal/error-proposal-modal/error-proposal-modal.component";

@Component({
  selector: 'app-dog-profile',
  templateUrl: './dog-profile.component.html',
  styleUrls: ['./dog-profile.component.scss', '../shared/profile/profile.scss']
})

export class DogProfileComponent implements OnInit, AfterViewInit {

  @ViewChild('avatar') avatar: ElementRef;
  public dog: DogProfileModel;
  public opinions: DogProfileOpinionModel[];
  public walks: DogWalksListModel[];
  public score: number;
  public viewOpinion = false;

  err: string;
  panelOpenState = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private dogProfileApi: DogProfileService,
    private router: Router,
    private dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    this.avatar.nativeElement.style.backgroundImage = `url('${this.dog}')`;
  }

  async ngOnInit(): Promise<void> {
    const dogId: number = this.route.snapshot.params.id;
    this.dog = await this.dogProfileApi.viewDogProfile(dogId);
    await this.dogProfileApi.dogWalksList(dogId)
      .then(value => {
        this.walks = value;
        this.walks.sort((a, b) => new Date(a.dateStart) > new Date(b.dateStart) ? 1 : -1);
      })
      .catch(reason => {
        console.log('error to:' + reason.error.reason);
        this.err = reason.error.reason;
      });

    this.score = Math.ceil((this.dog.sumOfRatings / (this.dog.numberOfRatings || 1)) * 100) / 100;
  }

  async showOpinion(): Promise<void>{
    this.viewOpinion = true;
    const dogId: number = this.route.snapshot.params.id;
    this.opinions = await this.dogProfileApi.viewOpinion(dogId);
    this.opinions.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1);
  }

  hideOpinion(): void{
    this.viewOpinion = false;
  }

  goToProfile(userId: number): void{
    this.router.navigate(['user', userId]);
  }

  openProposal(walk: DogWalksListModel): void {
    const dialogRef =  this.dialog.open( ProposalModalComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        dogName: this.dog.name,
        walk
      }
    }).afterClosed().subscribe(value => {
      if (value === true){
        this.dialog.open(SuccesProposalModalComponent);
      }
      else if (value) {
        this.dialog.open(ErrorProposalModalComponent, {
          data: {
            err: value
          }
        });
      }
    });
  }

  goToMainPage(): void{
    this.router.navigate(['dog-list']);
  }
}
