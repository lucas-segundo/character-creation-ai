import { Message } from "@/domain/entities/Message";
import { mockMessage } from "@/domain/entities/Message/mock";
import { SendMessages } from "@/domain/useCases/SendMessages";

export const makeSendMessagesUseCase = (): SendMessages.UseCase => {
  class SendMessagesUseCaseMocked implements SendMessages.UseCase {
    async send(messages: SendMessages.Messages): Promise<Message[]> {
      console.log(messages);

      const response = [
        mockMessage(),
        mockMessage()
      ]
      
      return response;
    }
  }

  return new SendMessagesUseCaseMocked();
}