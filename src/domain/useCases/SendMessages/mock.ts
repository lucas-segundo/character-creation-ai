import { vi, Mocked } from 'vitest';
import { SendMessages } from '.';

export const mockSendMessages = (): Mocked<SendMessages.UseCase> => ({
  send: vi.fn(),
});
