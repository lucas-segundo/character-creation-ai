import { mockAIContentGeneratorImplementation } from '@/data/interfaces/AIContentGenerator/mock'
import { describe, expect, it } from 'vitest'
import { SendMessagesImpl } from '.'
import { mockMessage } from '@/domain/entities/Message/mock'
import { AIContentGeneratorParams } from '@/data/interfaces/AIContentGenerator'
import { SendMessagesParams } from '@/domain/useCases/SendMessages'
import { faker } from '@faker-js/faker'
import { MessagesCreaterParams } from '@/data/interfaces/MessagesCreater'
import { MessageSenderEnum } from '@/domain/entities/Message'
import { mockMessagesCreater } from '@/data/interfaces/MessagesCreater/mock'

const makeSUT = () => {
  const aiContentGenerator = mockAIContentGeneratorImplementation()
  const messagesCreater = mockMessagesCreater()
  const sut = new SendMessagesImpl(aiContentGenerator, messagesCreater)

  const aiResponse: AIContentGeneratorParams = {
    texts: [faker.lorem.sentence(), faker.lorem.sentence()],
  }
  aiContentGenerator.generate.mockResolvedValueOnce(aiResponse)

  return { sut, aiContentGenerator, messagesCreater, aiResponse }
}

describe('SendMessagesImpl', () => {
  it('should call generate with correct params', async () => {
    const { sut, aiContentGenerator } = makeSUT()
    const messages = [mockMessage(), mockMessage()]

    const sendParams: SendMessagesParams = {
      chatID: faker.string.uuid(),
      messages,
    }
    await sut.send(sendParams)

    const expectedParams: AIContentGeneratorParams = {
      texts: messages.map((message) => message.text),
    }
    expect(aiContentGenerator.generate).toBeCalledWith(expectedParams)
  })

  it('should call create with correct params', async () => {
    const { sut, messagesCreater, aiResponse } = makeSUT()

    const messages = [mockMessage(), mockMessage()]
    const sendParams: SendMessagesParams = {
      chatID: faker.string.uuid(),
      messages,
    }
    await sut.send(sendParams)

    const aiMessages = aiResponse.texts.map((text) => ({
      text,
      chatID: sendParams.chatID,
      sender: MessageSenderEnum.BOT,
    }))

    const messagesWithoutID = [...aiMessages]
    const expectedParams: MessagesCreaterParams = {
      messages: messagesWithoutID,
    }
    expect(messagesCreater.create).toBeCalledWith(expectedParams)
  })

  it('should return created messages', async () => {
    const { sut, messagesCreater } = makeSUT()

    const messages = [mockMessage(), mockMessage()]
    messagesCreater.create.mockResolvedValueOnce(messages)

    const sendParams: SendMessagesParams = {
      chatID: faker.string.uuid(),
      messages,
    }

    const messagesCreated = await sut.send(sendParams)

    expect(messagesCreated).toEqual(messages)
  })
})
