import {StreamDataType} from '../utils/stream-data-type.enum';
import {Message} from './message';
import {Notification} from './notification';
import {Action} from '../utils/action.enum';

export interface StreamModel {
  type: StreamDataType
}

export interface MessageStreamModel extends StreamModel{
  value: {
    messageThreadId: number;
    participants: number[];
    messageModel: Message
  }
}

export interface NotificationStreamModel extends StreamModel {
  value: Notification
}

export interface ActionStreamModel extends StreamModel {
  value: {
    type: Action
  }
}
