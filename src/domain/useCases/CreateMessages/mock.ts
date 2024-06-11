import { vi, Mocked } from 'vitest'
import { CreateMessagesParams, CreateMessagesUseCase } from '.'
import { faker } from '@faker-js/faker'
import { mockMessage } from '@/domain/entities/Message/mock'

export const mockCreateMessagesParams = (): CreateMessagesParams => ({
  chatID: faker.string.uuid(),
  messages: [mockMessage(), mockMessage()],
})

export const mockCreateMessagesUseCase = (): Mocked<CreateMessagesUseCase> => ({
  create: vi.fn(),
})
