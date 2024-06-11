import {
  AIContentGenerator,
  AIContentGeneratorResult,
} from '@/data/interfaces/AIContentGenerator'
import { MessagesCreater } from '@/data/interfaces/MessagesCreater'
import { Message, MessageSenderEnum } from '@/domain/entities/Message'
import {
  SendMessagesUseCase,
  SendMessagesParams,
} from '@/domain/useCases/SendMessages'

export class SendMessagesImpl implements SendMessagesUseCase {
  constructor(
    private readonly aiContentGenerator: AIContentGenerator,
    private readonly messagesCreater: MessagesCreater.Implementation,
  ) {}

  async send(params: SendMessagesParams): Promise<Message[]> {
    const content = await this.aiContentGenerator.generate({
      texts: params.messages.map((message) => message.text),
    })
    const createdMessages = await this.createMessages(params.chatID, content)

    return createdMessages
  }

  private async createMessages(
    chatID: string,
    content: AIContentGeneratorResult,
  ) {
    const responseMessages = content.texts.map((text) => ({
      text,
      chatID,
      sender: MessageSenderEnum.BOT,
    }))

    const createdMessages = await this.messagesCreater.create({
      messages: responseMessages,
    })
    return createdMessages
  }
}
