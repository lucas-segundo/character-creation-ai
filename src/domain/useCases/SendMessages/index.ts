import { Message } from '@/domain/entities/Message'

export interface SendMessagesParams {
  chatID: string
  messages: Message[]
}

export interface SendMessagesUseCase {
  send: (params: SendMessagesParams) => Promise<Message[]>
}
