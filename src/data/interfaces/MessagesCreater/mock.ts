import { vi, Mocked } from 'vitest'
import { MessagesCreater } from '.'

export const mockMessagesCreaterImplementation =
  (): Mocked<MessagesCreater> => ({
    create: vi.fn(),
  })
