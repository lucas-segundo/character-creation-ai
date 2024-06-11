import { Message } from '@/domain/entities/Message'

export interface CreateMessagesParams {
  chatID: string
  messages: Message[]
}

export interface CreateMessagesUseCase {
  Create: (params: CreateMessagesParams) => Promise<Message[]>
}
