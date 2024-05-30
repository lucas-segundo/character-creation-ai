import { mockMessage } from '@/domain/entities/Message/mock'
import { SendMessages } from '@/domain/useCases/SendMessages'

export const makeSendMessagesUseCase = (): SendMessages.UseCase => {
  class SendMessagesUseCaseMocked implements SendMessages.UseCase {
    async send({
      messages,
    }: SendMessages.Params): Promise<SendMessages.Response> {
      console.log(messages)

      const responseMessages = [mockMessage(), mockMessage()]

      return {
        messages: responseMessages,
      }
    }
  }

  return new SendMessagesUseCaseMocked()
}
