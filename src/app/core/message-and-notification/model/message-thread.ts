import {Message} from './message';

export interface MessageThread {
  id: number;
  openAt: Date;
  unread: boolean;
  closedAt: null | Date;
  participant: Participant;
  walk: WalkData;
  messages: Message[];
}

interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar: Blob | null;
  read: Date | null;
}

export interface WalkData {
  dateEnd: Date;
  dateStart: Date;
  dogs: DogData[];
}

export interface DogData {
  avatar: Blob;
  dogName: string;
}
