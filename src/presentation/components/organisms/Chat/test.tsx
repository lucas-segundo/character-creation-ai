import { mockMessage } from '@/domain/entities/Message/mock';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Chat } from '.';

describe('Chat', () => {
  it('should render the messages', () => {
    const messages = [mockMessage(), mockMessage()];
    render(<Chat messages={messages} />);

    messages.forEach((message) => {
      expect(screen.getByText(message.text)).toBeDefined();
    });
  });
});
