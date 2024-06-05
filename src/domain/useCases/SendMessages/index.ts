import { Message } from '@/domain/entities/Message'

export namespace SendMessages {
  export interface MessageParam
    extends Pick<Message, 'text' | 'chatID' | 'sender'> {
    id?: string
  }

  export interface Params {
    chatID: string
    messages: MessageParam[]
  }

  export interface Response {
    messages: Message[]
  }
  export interface UseCase {
    send: (params: Params) => Promise<Response>
  }
}
