'use client'
import { makeErrorNotifier } from '@/factories/presentation/makeErrorNotifier'
import { makeSendMessagesUseCase } from '@/factories/useCases/makeSendMessages'
import { ChatRoom } from '@/presentation/components/templates/ChatRoom'

export default function Home() {
  return (
    <ChatRoom
      sendMessageUseCase={makeSendMessagesUseCase()}
      errorNotifier={makeErrorNotifier()}
    />
  )
}
