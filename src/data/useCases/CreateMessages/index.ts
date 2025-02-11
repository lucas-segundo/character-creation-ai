import { MessagesCreater } from '@/data/interfaces/MessagesCreater'
import { Message } from '@/domain/entities/Message'
import {
  CreateMessagesUseCase,
  CreateMessagesParams,
} from '@/domain/useCases/CreateMessages'

export class CreateMessagesImpl implements CreateMessagesUseCase {
  constructor(private readonly messagesCreater: MessagesCreater) {}

  async create(params: CreateMessagesParams): Promise<Message[]> {
    const messages = params.messages.map((message) => ({
      ...message,
      chatID: params.chatID,
    }))
    const createdMessages = await this.messagesCreater.create({ messages })

    return createdMessages
  }
}
