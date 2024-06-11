import { Message } from '@/domain/entities/Message'
import { mockMessage } from '@/domain/entities/Message/mock'
import {
  SendMessagesUseCase,
  SendMessagesParams,
} from '@/domain/useCases/SendMessages'

export const makeSendMessagesUseCase = (): SendMessagesUseCase => {
  class SendMessagesUseCaseMocked implements SendMessagesUseCase {
    async send({ messages }: SendMessagesParams): Promise<Message[]> {
      console.log(messages)

      const responseMessages = [mockMessage(), mockMessage()]

      return responseMessages
    }
  }

  return new SendMessagesUseCaseMocked()
}
