import { mockSendMessages } from '@/domain/useCases/SendMessages/mock'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ChatRoom } from '.'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { MessageSenderEnum } from '@/domain/entities/Message'
import { mockMessage } from '@/domain/entities/Message/mock'
import { SendMessages } from '@/domain/useCases/SendMessages'
import { mockErrorNotifier } from '@/presentation/interfaces/ErrorNotifier/mock'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'

const makeSUT = () => {
  const sendMessageUseCase = mockSendMessages()
  const errorNotifier = mockErrorNotifier()
  render(
    <ChatRoom
      sendMessageUseCase={sendMessageUseCase}
      errorNotifier={errorNotifier}
    />,
  )

  return { sendMessageUseCase, errorNotifier }
}

describe('ChatRoom', () => {
  const { sendMessageUseCase, errorNotifier } = makeSUT()

  it('should call send messages with right params', async () => {
    const response: SendMessages.Response = {
      messages: [mockMessage()],
    }
    sendMessageUseCase.send.mockResolvedValue(response)

    const user = userEvent.setup()
    const text = faker.lorem.sentence()

    await user.type(screen.getByTestId('message-input'), text)
    await user.click(screen.getByTestId('send-button'))

    const params: SendMessages.Params = {
      messages: [{ chatID: '1', sender: MessageSenderEnum.USER, text }],
    }
    expect(sendMessageUseCase.send).toBeCalledWith(params)
  })

  it('should call error notifier with right params', async () => {
    const error = new UnexpectedError()
    sendMessageUseCase.send.mockRejectedValue(error)

    const user = userEvent.setup()

    await user.type(screen.getByTestId('message-input'), faker.lorem.sentence())
    await user.click(screen.getByTestId('send-button'))

    expect(errorNotifier.notify).toBeCalledWith(error)
  })
})
