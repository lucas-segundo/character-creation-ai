import { vi, Mocked } from 'vitest'
import { SendMessage } from '.'

export const mockSendMessage = (): Mocked<SendMessage.UseCase> => ({
  send: vi.fn(),
})