import { vi, Mocked } from 'vitest'
import { Params, SendMessagesUseCase } from '.'
import { faker } from '@faker-js/faker'
import { mockMessage } from '@/domain/entities/Message/mock'

export const mockParams = (): Params => ({
  chatId: faker.string.uuid(),
  messages: [mockMessage(), mockMessage()],
})

export const mockSendMessagesUseCase = (): Mocked<SendMessagesUseCase> => ({
  send: vi.fn(),
})
