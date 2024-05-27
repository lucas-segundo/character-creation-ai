export enum MessageSenderEnum {
  USER = 0,
  BOT = 1,
  SYSTEM = 2,
}

export interface Message {
  id: string;
  text: string;
  chatID: string;
  sender: MessageSenderEnum;
}