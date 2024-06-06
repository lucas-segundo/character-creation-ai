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
    const createdMessages = await this.createMessages(response, params)

    return createdMessages
  }

  private async createMessages(
    response: AIContentGenerator.Response,
    params: SendMessages.Params,
  ) {
    const allMessagesToCreate = this.filterAndJoinMessagesToCreate(
      params.messages,
      response,
      params.chatID,
    )

    const messagesCreated = await this.messagesCreater.create({
      messages: allMessagesToCreate,
    })
    return messagesCreated
  }

  private filterAndJoinMessagesToCreate(
    messages: SendMessages.Params['messages'],
    response: AIContentGenerator.Response,
    chatID: string,
  ) {
    const responseMessages = response.texts.map((text) => ({
      text,
      chatID,
      sender: MessageSenderEnum.BOT,
    }))

    const previousMessages = messages.map((message) => ({
      ...message,
      chatID,
    }))
    const previousMessagesWithoutID = previousMessages.filter(
      (message) => !message.id,
    )

    return [...previousMessagesWithoutID, ...responseMessages]
  }
}
