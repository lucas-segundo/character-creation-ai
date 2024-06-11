import { vi, Mocked } from 'vitest'
import { MessagesCreater } from '.'

export const mockMessagesCreater = (): Mocked<MessagesCreater> => ({
  create: vi.fn(),
})
