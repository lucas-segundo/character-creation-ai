import { Message } from "@/domain/entities/Message";
import { mockMessage } from "@/domain/entities/Message/mock";
import { SendMessage } from "@/domain/useCases/SendMessage";

export const makeSendMessageUseCase = (): SendMessage.UseCase => {
  class SendMessageUseCaseMocked implements SendMessage.UseCase {
    async send(params: SendMessage.Params): Promise<Message> {
      console.log(params);
      const message = {
        ...mockMessage(),
        ...params
      }
      
      return message;
    }
  }

  return new SendMessageUseCaseMocked();
}