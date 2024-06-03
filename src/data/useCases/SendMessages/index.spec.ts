import { mockAIContentGeneratorImplementation } from '@/data/interfaces/AIContentGenerator/mock'
import { describe, expect, it } from 'vitest'
import { SendMessagesUseCase } from '.'
import { mockMessage } from '@/domain/entities/Message/mock'
import { AIContentGenerator } from '@/data/interfaces/AIContentGenerator'
import { SendMessages } from '@/domain/useCases/SendMessages'
import { faker } from '@faker-js/faker'

const makeSUT = () => {
  const aiContentGenerator = mockAIContentGeneratorImplementation()
  const sut = new SendMessagesUseCase(aiContentGenerator)
  return { sut, aiContentGenerator }
}

describe('SendMessagesUseCase', () => {
  it('should call generate with correct params', async () => {
    const { sut, aiContentGenerator } = makeSUT()
    const messages = [mockMessage(), mockMessage()]

    const sendParams: SendMessages.Params = {
      chatID: faker.string.uuid(),
      messages,
    }
    await sut.send(sendParams)

    const expectedParams: AIContentGenerator.Params = {
      texts: messages.map((message) => message.text),
    }
    expect(aiContentGenerator.generate).toBeCalledWith(expectedParams)
  })
})
