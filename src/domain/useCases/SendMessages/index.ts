import { Message } from '@/domain/entities/Message'

export interface Params {
  chatID: string
  messages: Message[]
}

export interface SendMessagesUseCase {
  send: (params: Params) => Promise<Message[]>
}
