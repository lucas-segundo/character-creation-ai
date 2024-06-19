import { GeminiAIContentGenerator } from '@/infra/gemini/AIContentGenerator'
import { AIContentGeneratorParams } from '@/data/interfaces/AIContentGenerator'
import { describe, expect, it, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import { mockChatSession } from '../mock'
import { ChatSession, GenerateContentResult } from '@google/generative-ai'

describe('GeminiAIContentGenerator', () => {
  const chatSession = mockChatSession()
  const sut = new GeminiAIContentGenerator(
    chatSession as unknown as ChatSession,
  )

  it('should call sendMessage on ChatSession with correct parameters', async () => {
    const params: AIContentGeneratorParams = {
      texts: [faker.lorem.paragraph()],
    }
    const result = {
      response: {
        text: () => faker.lorem.paragraph(),
      },
    } as unknown as GenerateContentResult
    chatSession.sendMessage.mockResolvedValue(result)
    await sut.generate(params)

    expect(chatSession.sendMessage).toHaveBeenCalledWith(params.texts)
  })
})
