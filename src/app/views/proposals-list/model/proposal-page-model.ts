
export interface ProposalPageModel {
  proposalListModels: ProposalListModel[];
  userListModels: UserProposalModel[];
}

export interface ProposalListModel{
  proposalId: number;
  dogProfileId: number;
  dateStart: string;
  dateEnd: string;
  status: ProposalListStatusEnum;
  dogAvatar: Blob;
  dogName: string;
  userBaseId: number;
  requestId: number;
  messageThread: number;
}

export interface UserProposalModel{
  userBaseId: number;
  requestUserProfileId: number;
  requestUserFirstName: string;
  requestUserAvatar: Blob;
}

export enum ProposalListStatusEnum {
  Waiting = 'WAITING',
  Accepted = 'ACCEPTED',
  Completed = 'COMPLETED',
  History = 'HISTORY'
}
