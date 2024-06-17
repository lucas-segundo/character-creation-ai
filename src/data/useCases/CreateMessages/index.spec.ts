import { describe, expect, it } from 'vitest'
import { CreateMessagesImpl } from '.'
import { mockMessage } from '@/domain/entities/Message/mock'
import { CreateMessagesParams } from '@/domain/useCases/CreateMessages'
import { faker } from '@faker-js/faker'
import { mockMessagesCreater } from '@/data/interfaces/MessagesCreater/mock'

const makeSUT = () => {
  const messagesCreater = mockMessagesCreater()
  const sut = new CreateMessagesImpl(messagesCreater)

  return { sut, messagesCreater }
}

describe('CreateMessagesImpl', () => {
  it('should call create with correct params', async () => {
    const { sut, messagesCreater } = makeSUT()

    const messages = [mockMessage(), mockMessage()]
    const createParams: CreateMessagesParams = {
      chatID: faker.string.uuid(),
      messages,
    }
    await sut.create(createParams)

    const expectedMessages = messages.map((message) => ({
      ...message,
      chatID: createParams.chatID,
    }))
    expect(messagesCreater.create).toBeCalledWith({
      messages: expectedMessages,
    })
  })

  it('should return created messages', async () => {
    const { sut, messagesCreater } = makeSUT()

    const messages = [mockMessage(), mockMessage()]
    messagesCreater.create.mockResolvedValueOnce(messages)

    const sendParams: CreateMessagesParams = {
      chatID: faker.string.uuid(),
      messages,
    }

    const messagesCreated = await sut.create(sendParams)

    expect(messagesCreated).toEqual(messages)
  })
})
