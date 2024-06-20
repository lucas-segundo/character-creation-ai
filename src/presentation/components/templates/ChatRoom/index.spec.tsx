import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ChatRoom } from '.'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { MessageSenderEnum } from '@/domain/entities/Message'
import { mockErrorNotifier } from '@/presentation/interfaces/ErrorNotifier/mock'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'
import { mockCreateMessagesUseCase } from '@/domain/useCases/CreateMessages/mock'
import { CreateMessagesParams } from '@/domain/useCases/CreateMessages'
import { mockSendMessagesUseCase } from '@/domain/useCases/SendMessages/mock'
import { mockMessage } from '@/domain/entities/Message/mock'

const makeSUT = () => {
  const sendMessageUseCase = mockSendMessagesUseCase()
  const createMessagesUseCase = mockCreateMessagesUseCase()
  const errorNotifier = mockErrorNotifier()
  render(
    <ChatRoom
      sendMessageUseCase={sendMessageUseCase}
      createMessagesUseCase={createMessagesUseCase}
      errorNotifier={errorNotifier}
    />,
  )

  return { sendMessageUseCase, createMessagesUseCase, errorNotifier }
}

describe('ChatRoom', () => {
  it('should call create messages with right params', async () => {
    const { createMessagesUseCase, sendMessageUseCase } = makeSUT()

    createMessagesUseCase.create.mockResolvedValueOnce([mockMessage()])
    sendMessageUseCase.send.mockResolvedValue([mockMessage()])

    const user = userEvent.setup()
    const text = faker.lorem.sentence()

    await user.type(screen.getByTestId('message-input'), text)
    await user.click(screen.getByTestId('send-button'))

    const params: CreateMessagesParams = {
      chatID: '1',
      messages: [
        {
          sender: MessageSenderEnum.USER,
          text,
        },
      ],
    }
    expect(createMessagesUseCase.create).toBeCalledWith(params)
  })

  it('should call send messages with right params', async () => {
    const { createMessagesUseCase, sendMessageUseCase } = makeSUT()

    const createdMessages = [mockMessage()]
    createMessagesUseCase.create.mockResolvedValueOnce(createdMessages)
    sendMessageUseCase.send.mockResolvedValue([mockMessage()])

    const user = userEvent.setup()
    const text = faker.lorem.sentence()

    await user.type(screen.getByTestId('message-input'), text)
    await user.click(screen.getByTestId('send-button'))

    expect(sendMessageUseCase.send).toBeCalledWith({
      chatID: '1',
      messages: createdMessages,
    })
  })

  it('should call error notifier with right params', async () => {
    const { sendMessageUseCase, errorNotifier, createMessagesUseCase } =
      makeSUT()

    const error = new UnexpectedError()
    sendMessageUseCase.send.mockRejectedValue(error)
    createMessagesUseCase.create.mockResolvedValueOnce([mockMessage()])

    const user = userEvent.setup()

    await user.type(screen.getByTestId('message-input'), faker.lorem.sentence())
    await user.click(screen.getByTestId('send-button'))

    expect(errorNotifier.notify).toBeCalledWith(error)
  })

  it('should render messages', async () => {
    const { createMessagesUseCase, sendMessageUseCase } = makeSUT()

    const createdMessages = [mockMessage(), mockMessage()]
    createMessagesUseCase.create.mockResolvedValueOnce(createdMessages)

    const response = [mockMessage(), mockMessage()]
    sendMessageUseCase.send.mockResolvedValue(response)

    const user = userEvent.setup()

    await user.type(screen.getByTestId('message-input'), faker.lorem.sentence())
    await user.click(screen.getByTestId('send-button'))

    const allMessages = [...createdMessages, ...response]
    allMessages.forEach((message) => {
      expect(screen.getByText(message.text)).toBeInTheDocument()
    })
  })
})
