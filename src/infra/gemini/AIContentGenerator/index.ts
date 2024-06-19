import {
  AIContentGenerator,
  AIContentGeneratorParams,
  AIContentGeneratorResult,
} from '@/data/interfaces/AIContentGenerator'
import { ChatSession } from '@google/generative-ai'

export class GeminiAIContentGenerator implements AIContentGenerator {
  constructor(private readonly chatSession: ChatSession) {}

  async generate(
    params: AIContentGeneratorParams,
  ): Promise<AIContentGeneratorResult> {
    const content = await this.chatSession.sendMessage(params.texts)

    return {
      texts: [content.response.text()],
    }
  }
}
