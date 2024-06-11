import { Message } from '@/domain/entities/Message'

export interface MessagesCreaterParams {
  messages: Omit<Message, 'id'>[]
}

export interface MessagesCreater {
  create: (params: MessagesCreaterParams) => Promise<Message[]>
}
