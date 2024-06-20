import { SendMessagesImpl } from '@/data/useCases/SendMessages'
import { SendMessagesUseCase } from '@/domain/useCases/SendMessages'
import { startGiminiChat } from '@/infra/gemini'
import { GeminiAIContentGenerator } from '@/infra/gemini/AIContentGenerator'
import { falloutCharacterCreationInstructions } from '@/infra/gemini/instructions/falloutCharacterCreation'
import { LocalStorageMessagesCreater } from '@/infra/localStorage/MessagesCreater'

export const makeSendMessagesUseCase = (): SendMessagesUseCase => {
  const geminiAPIKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

  if (!geminiAPIKey) {
    throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is required')
  }

  const chat = startGiminiChat({
    apiKey: geminiAPIKey,
    systemInstruction: falloutCharacterCreationInstructions,
  })
  const generator = new GeminiAIContentGenerator(chat)
  const messagesCreater = new LocalStorageMessagesCreater()

  return new SendMessagesImpl(generator, messagesCreater)
}
