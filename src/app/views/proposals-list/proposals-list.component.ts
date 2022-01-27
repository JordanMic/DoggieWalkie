import { Component, OnInit } from '@angular/core';
import {ProposalPageModel} from './model/proposal-page-model';
import {ProposalListService} from './service/proposal-list.service';
import {RejectModalComponent} from '../../components/walk-requests-lists-modals/reject-modal/reject-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ConfirmModalComponent} from '../../components/walk-requests-lists-modals/confirm-modal/confirm-modal.component';
import {ConfirmDogModalComponent} from "../../components/walk-requests-lists-modals/confirm-dog-modal/confirm-dog-modal.component";

@Component({
  selector: 'app-proposals-list',
  templateUrl: './proposals-list.component.html',
  styleUrls: ['./proposals-list.component.scss']
})
export class ProposalsListComponent implements OnInit {
  public proposals: ProposalPageModel;

  constructor(
    private proposalService: ProposalListService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
     this.proposals = await this.proposalService.getProposalList();
    }

  openDropdown(): void
  {

  }

  async goToHistory(): Promise<void>{
    this.proposals = await this.proposalService.getHistoryProposalList();
  }

  async goToProposalList(): Promise<void>{
    this.proposals = await this.proposalService.getProposalList();
  }

  async reject(proposalId: number): Promise<void>{
    this.dialog.open(RejectModalComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        proposalsId: proposalId
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  async confirm(userFirstName: string, requestID: number, proposalID: number): Promise<void>{
    this.dialog.open(ConfirmDogModalComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        userName: userFirstName,
        requestId: requestID,
        proposalId: proposalID
      }
    }).afterClosed().subscribe(result => {
      this.proposalService.getProposalList();
      this.ngOnInit();
    });
  }

  }


