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

    const responseMessages = response.texts.map((text) => ({
      text,
      chatID: params.chatID,
      sender: MessageSenderEnum.BOT,
    }))

    const previousMessages = params.messages.map((message) => ({
      ...message,
      chatID: params.chatID,
    }))
    const previousMessagesWithoutID = previousMessages.filter(
      (message) => !message.id,
    )

    const allMessagesToCreate: MessagesCreater.Params['messages'] = [
      ...previousMessagesWithoutID,
      ...responseMessages,
    ]

    const messagesCreated = await this.messagesCreater.create({
      messages: allMessagesToCreate,
    })
    return messagesCreated
  }
}
