import { afterEach, describe, expect, it, vi } from 'vitest'
import { LocalStorageMessagesCreater } from '.'
import { mockMessage } from '@/domain/entities/Message/mock'

const makeSUT = () => {
  const sut = new LocalStorageMessagesCreater()

  return {
    sut,
  }
}

describe('MessagesCreater', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')

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
})
