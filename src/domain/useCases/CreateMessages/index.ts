import { Message } from '@/domain/entities/Message'

export interface CreateMessagesParams {
  chatID: string
  messages: Pick<Message, 'sender' | 'text'>[]
}

export interface CreateMessagesUseCase {
  create: (params: CreateMessagesParams) => Promise<Message[]>
}
