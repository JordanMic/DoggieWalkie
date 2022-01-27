export type DogWalkRequest = DogWalk[];

export interface DogWalk {
  dateEnd: string;
  dateStart: string;
  dogProfileId: number[];
  requestId: number;
  status: DogWalkStatusEnum;
  requestStatus: DogWalkStatusEnum;
}

export enum DogWalkStatusEnum {
  Waiting = 'WAITING',
  Accepted = 'ACCEPTED',
  Completed = 'COMPLETED',
  History = 'HISTORY'
}

export interface DogWalkRow extends DogWalk {
  showOffers: boolean;
  proposals: DogWalkProposal[] | null;
}

export interface  DogWalkProposalResponse {
  proposals: DogWalkProposal[];
  requestId: number | null;
}


export interface DogWalkProposal {
  dateEnd: string;
  dateStart: string;
  description: string;
  numberOfRatings: number;
  proposalId: number;
  status: string;
  sumOfRatings: number;
  userAvatar: Blob;
  userBaseId: number;
  userFirstName: string;
  score?: number;
  messageThread: number;
  requestStatus: DogWalkStatusEnum;
}
