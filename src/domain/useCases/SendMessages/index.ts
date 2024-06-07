import { Message } from '@/domain/entities/Message'

export namespace SendMessages {
  export interface Params {
    chatID: string
    messages: Message[]
  }

  export interface UseCase {
    send: (params: Params) => Promise<Message[]>
  }
}
