import { AIContentGenerator } from '@/data/interfaces/AIContentGenerator'
import { MessagesCreater } from '@/data/interfaces/MessagesCreater'
import { Message, MessageSenderEnum } from '@/domain/entities/Message'
import { SendMessages } from '@/domain/useCases/SendMessages'

export class SendMessagesUseCase implements SendMessages.UseCase {
  constructor(
    private readonly aiContentGenerator: AIContentGenerator.Implementation,
    private readonly messagesCreater: MessagesCreater.Implementation,
  ) {}

  async send(params: SendMessages.Params): Promise<Message[]> {
    const response = await this.aiContentGenerator.generate({
      texts: params.messages.map((message) => message.text),
    })
    const createdMessages = await this.createMessages(params.chatID, response)

    return createdMessages
  }

  private async createMessages(
    chatID: string,
    response: AIContentGenerator.Response,
  ) {
    const responseMessages = response.texts.map((text) => ({
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
