import { Message } from '@/domain/entities/Message'

export namespace SendMessages {
  export interface MessageParam extends Pick<Message, 'text' | 'sender'> {
    id?: string
  }

  export interface Params {
    chatID: string
    messages: MessageParam[]
  }

  export interface UseCase {
    send: (params: Params) => Promise<Message[]>
  }
}
