import { Message } from "@/domain/entities/Message";

export namespace SendMessages {
  export type Messages = Pick<Message, 'text' | 'chatID' | 'sender'>[]

  export interface Response {
    messages: Message[]
  }
  export interface UseCase {
    send: (messages: Messages) => Promise<Response>;
  }
}