import { afterEach, describe, expect, it, vi } from 'vitest'
import { LocalStorageMessagesCreater } from '.'
import { mockMessage } from '@/domain/entities/Message/mock'
import * as uuid from 'uuid'
import { faker } from '@faker-js/faker'

vi.mock('uuid')

const makeSUT = () => {
  const sut = new LocalStorageMessagesCreater()

  return {
    sut,
  }
}

describe('MessagesCreater', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
  const uuidSpy = vi.spyOn(uuid, 'v4')

  afterEach(() => {
    localStorage.clear()
  })

  it('should call get local storage with right params', async () => {
    const { sut } = makeSUT()

    await sut.create({
      messages: [mockMessage(), mockMessage()],
    })

    expect(getItemSpy).toHaveBeenCalledWith('messages')
  })

  it('should call set local storage with right params', async () => {
    const { sut } = makeSUT()

    const uuid = faker.string.uuid()
    uuidSpy.mockReturnValue(uuid)

    const messagesFromStorage = [mockMessage(), mockMessage()]
    getItemSpy.mockReturnValueOnce(JSON.stringify(messagesFromStorage))

    const messages = [mockMessage(), mockMessage()]
    await sut.create({
      messages,
    })

    const expectedMessages = [
      ...messagesFromStorage,
      ...messages.map((message) => ({
        ...message,
        id: uuid,
      })),
    ]
    expect(setItemSpy).toHaveBeenCalledWith('messages', JSON.stringify(expectedMessages))
  })
})
