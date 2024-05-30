'use client'
import { makeErrorNotifier } from '@/factories/presentation/makeErrorNotifier'
import { makeSendMessagesUseCase } from '@/factories/useCases/SendMessages'
import { ChatRoom } from '@/presentation/components/templates/ChatRoom'

export default function Home() {
  return (
    <ChatRoom
      sendMessageUseCase={makeSendMessagesUseCase()}
      errorNotifier={makeErrorNotifier()}
    />
  )
}
