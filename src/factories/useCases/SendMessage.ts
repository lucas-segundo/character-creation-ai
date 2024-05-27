import { SendMessage } from "@/domain/useCases/SendMessage";

export const makeSendMessageUseCase = (): SendMessage.UseCase => {
  class SendMessageUseCaseMocked implements SendMessage.UseCase {
    async send(params: SendMessage.Params): Promise<void> {
      console.log(params);
      return;
    }
  }

  return new SendMessageUseCaseMocked();
}