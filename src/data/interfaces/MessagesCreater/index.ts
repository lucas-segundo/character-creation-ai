import { Message } from '@/domain/entities/Message'

export namespace MessagesCreater {
  export interface Params {
    messages: Omit<Message, 'id'>[]
  }

  export interface Implementation {
    create: (params: Params) => Promise<Message[]>
  }
}
