import {NotificationType} from '../utils/notification-type.enum';

export interface Notification {
  id: number;
  type: NotificationType,
  read: boolean;
  createAt: Date;
  value: any;
}
