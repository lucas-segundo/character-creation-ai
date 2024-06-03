import { mockAIContentGeneratorImplementation } from '@/data/interfaces/AIContentGenerator/mock'
import { describe, expect, it } from 'vitest'
import { SendMessagesUseCase } from '.'
import { mockMessage } from '@/domain/entities/Message/mock'
import { AIContentGenerator } from '@/data/interfaces/AIContentGenerator'

const makeSUT = () => {
  const aiContentGenerator = mockAIContentGeneratorImplementation()
  const sut = new SendMessagesUseCase(aiContentGenerator)
  return { sut, aiContentGenerator }
}

describe('SendMessagesUseCase', () => {
  it('should call generate with correct params', async () => {
    const { sut, aiContentGenerator } = makeSUT()
    const messages = [mockMessage(), mockMessage()]

    await sut.send({ messages })

    const expectedParams: AIContentGenerator.Params = {
      texts: messages.map((message) => message.text),
    }
    expect(aiContentGenerator.generate).toBeCalledWith(expectedParams)
  })
})
