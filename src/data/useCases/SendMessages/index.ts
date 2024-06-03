import { AIContentGenerator } from '@/data/interfaces/AIContentGenerator'
import { SendMessages } from '@/domain/useCases/SendMessages'

export class SendMessagesUseCase implements SendMessages.UseCase {
  constructor(
    private readonly aiContentGenerator: AIContentGenerator.Implementation,
  ) {}

  async send(params: SendMessages.Params): Promise<SendMessages.Response> {
    await this.aiContentGenerator.generate({
      texts: params.messages.map((message) => message.text),
    })

    return {} as SendMessages.Response
  }
}
