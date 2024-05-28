import { Message } from "@/domain/entities/Message";
import { mockMessage } from "@/domain/entities/Message/mock";
import { SendMessages } from "@/domain/useCases/SendMessages";

export const makeSendMessagesUseCase = (): SendMessages.UseCase => {
  class SendMessagesUseCaseMocked implements SendMessages.UseCase {
    async send(params: SendMessages.Params): Promise<Message> {
      console.log(params);
      const message = {
        ...mockMessage(),
        ...params
      }
      
      return message;
    }
  }

  return new SendMessagesUseCaseMocked();
}