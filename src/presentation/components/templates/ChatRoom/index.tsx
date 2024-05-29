import { useState } from "react"
import { Chat } from "../../organisms/Chat"
import { Header } from "../../organisms/Header"
import { SendMessageInput } from "../../organisms/SendMessageInput"
import { Message, MessageSenderEnum } from "@/domain/entities/Message"
import { SendMessages } from "@/domain/useCases/SendMessages"

interface Props {
  sendMessageUseCase: SendMessages.UseCase
}

export const ChatRoom = ({ sendMessageUseCase }: Props) => {
  const [messagesState, setMessagesState] = useState<Message[]>([])

  const sendMessages = async (text: string) => {
    const messages: SendMessages.Messages = [
      ...messagesState,
      {
        chatID: '1',
        sender: MessageSenderEnum.USER,
        text
      }
    ]

    return await sendMessageUseCase.send(messages)
  }

  const handleOnSendMessage = async (text: string) => {
    try {
      const response = await sendMessages(text)
      setMessagesState(prev => [...prev, ...response.messages])
    } catch {}
  }

  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <Chat messages={messagesState} />
      </div>
      <SendMessageInput onSend={({ text }) => text && handleOnSendMessage(text)}/>  
    </div>
  )
}