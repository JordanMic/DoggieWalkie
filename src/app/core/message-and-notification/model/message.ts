export interface Message {
  id: number;
  author: number | null;
  sentAt: Date;
  content: string;
}
