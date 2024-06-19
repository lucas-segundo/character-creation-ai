import { ChatSession } from '@google/generative-ai'
import { Mocked, vi } from 'vitest'

export const mockChatSession = (): Mocked<
  Pick<ChatSession, 'sendMessage'>
> => ({
  sendMessage: vi.fn(),
})
