'use client'
import { makeErrorNotifier } from '@/factories/presentation/makeErrorNotifier'
import { makeCreateMessagesUseCase } from '@/factories/useCases/makeCreateMessages'
import { makeSendMessagesUseCase } from '@/factories/useCases/makeSendMessages'
import { ChatRoom } from '@/presentation/components/templates/ChatRoom'

export default function Home() {
  return (
    <ChatRoom
      createMessagesUseCase={makeCreateMessagesUseCase()}
      sendMessageUseCase={makeSendMessagesUseCase()}
      errorNotifier={makeErrorNotifier()}
    />
  )
}
