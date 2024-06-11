import { Message } from '@/domain/entities/Message'

export interface MessagesCreaterParams {
  messages: Pick<Message, 'chatID' | 'sender' | 'text'>[]
}

export interface MessagesCreater {
  create: (params: MessagesCreaterParams) => Promise<Message[]>
}
