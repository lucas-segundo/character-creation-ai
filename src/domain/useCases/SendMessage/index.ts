namespace SendMessage {
  export interface Params {
    text: string;
    chatID: string;
  }

  export interface UseCase {
    send: (params: Params) => Promise<void>;
  }
}

export type { SendMessage };