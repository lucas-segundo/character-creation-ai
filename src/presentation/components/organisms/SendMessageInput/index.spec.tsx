import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SendMessageInput } from '.';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';

describe('SendMessageInput', () => {
  it('should call onSend with right params', () => {
    const mockedOnSend = vi.fn();
    render(<SendMessageInput onSend={mockedOnSend} />);

    const user = userEvent.setup();
    const text = faker.lorem.sentence();

    act(() => {
      user.type(screen.getByTestId('message-input'), text);
      user.click(screen.getByTestId('send-button'));
    });

    waitFor(() => expect(mockedOnSend).toBeCalledWith({ text }));
  });
});
