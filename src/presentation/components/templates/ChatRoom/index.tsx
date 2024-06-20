import { useState } from 'react'
import { Chat } from '../../organisms/Chat'
import { Header } from '../../organisms/Header'
import { SendMessageInput } from '../../organisms/SendMessageInput'
import { Message, MessageSenderEnum } from '@/domain/entities/Message'
import { ErrorNotifier } from '@/presentation/interfaces/ErrorNotifier'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'
import { SendMessagesUseCase } from '@/domain/useCases/SendMessages'
import { CreateMessagesUseCase } from '@/domain/useCases/CreateMessages'

interface Props {
  sendMessageUseCase: SendMessagesUseCase
  createMessagesUseCase: CreateMessagesUseCase
  errorNotifier: ErrorNotifier
}

export const ChatRoom = ({
  sendMessageUseCase,
  createMessagesUseCase,
  errorNotifier,
}: Props) => {
  const [messagesState, setMessagesState] = useState<Message[]>([])

  const sendMessages = async (text: string) => {
    const createdMessages = await createMessagesUseCase.create({
      chatID: '1',
      messages: [
        {
          sender: MessageSenderEnum.USER,
          text: text,
        },
      ],
    })

    setMessagesState((prev) => [...prev, ...createdMessages])

    return await sendMessageUseCase.send({
      chatID: '1',
      messages: createdMessages,
    })
  }

  const handleOnSendMessage = async (text: string) => {
    try {
      const response = await sendMessages(text)
      setMessagesState((prev) => [...prev, ...response])
    } catch {
      errorNotifier.notify(new UnexpectedError())
    }
  }

  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <Chat messages={messagesState} />
      </div>
      <SendMessageInput onSend={({ text }) => handleOnSendMessage(text)} />
    </div>
  )
}
