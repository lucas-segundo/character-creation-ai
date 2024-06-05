import { vi, Mocked } from 'vitest'
import { MessagesCreater } from '.'

export const mockMessagesCreaterImplementation =
  (): Mocked<MessagesCreater.Implementation> => ({
    create: vi.fn(),
  })
