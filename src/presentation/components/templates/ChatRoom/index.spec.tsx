import { mockSendMessages } from '@/domain/useCases/SendMessages/mock';
import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChatRoom } from '.';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import { MessageSenderEnum } from '@/domain/entities/Message';
import { mockMessage } from '@/domain/entities/Message/mock';
import { SendMessages } from '@/domain/useCases/SendMessages';

describe('ChatRoom', () => {
  it('should call send messages with right params', () => {
    const sendMessageUseCase = mockSendMessages();
    render(<ChatRoom sendMessageUseCase={sendMessageUseCase} />);

    const response: SendMessages.Response = {
      messages: [mockMessage()],
    };
    sendMessageUseCase.send.mockResolvedValue(response);

    const user = userEvent.setup();
    const text = faker.lorem.sentence();

    act(() => {
      user.type(screen.getByTestId('message-input'), text);
      user.click(screen.getByTestId('send-button'));
    });

    waitFor(() =>
      expect(sendMessageUseCase.send).toBeCalledWith([
        { chatID: '1', sender: MessageSenderEnum.USER, text },
      ]),
    );
  });
});
