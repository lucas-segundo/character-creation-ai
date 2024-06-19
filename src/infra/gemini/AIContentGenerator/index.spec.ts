import { GeminiAIContentGenerator } from '@/infra/gemini/AIContentGenerator'
import { AIContentGeneratorParams } from '@/data/interfaces/AIContentGenerator'
import { describe, expect, it, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import { mockChatSession } from '../mock'
import { ChatSession, GenerateContentResult } from '@google/generative-ai'

const makeSUT = () => {
  const chatSession = mockChatSession()
  const sut = new GeminiAIContentGenerator(
    chatSession as unknown as ChatSession,
  )

  return { sut, chatSession }
}

describe('GeminiAIContentGenerator', () => {
  it('should call sendMessage on ChatSession with correct parameters', async () => {
    const { sut, chatSession } = makeSUT()

    const result = {
      response: {
        text: () => faker.lorem.paragraph(),
      },
    } as unknown as GenerateContentResult
    chatSession.sendMessage.mockResolvedValue(result)

    const params: AIContentGeneratorParams = {
      texts: [faker.lorem.paragraph()],
    }
    await sut.generate(params)

    expect(chatSession.sendMessage).toHaveBeenCalledWith(params.texts)
  })
})
