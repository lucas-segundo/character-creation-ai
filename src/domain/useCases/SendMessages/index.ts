import { Message, MessageSenderEnum } from "@/domain/entities/Message";

namespace SendMessages {
  export interface MessageParams {
    text: string;
    chatID: string;
    sender: MessageSenderEnum
  }

  export interface Params {
    messages: MessageParams[]
  }

  export interface UseCase {
    send: (params: Params) => Promise<Message>;
  }
}

export type { SendMessages };