import { Message } from "@/domain/entities/Message";

namespace SendMessage {
  export interface Params {
    text: string;
    chatID: string;
  }

  export interface UseCase {
    send: (params: Params) => Promise<Message>;
  }
}

export type { SendMessage };