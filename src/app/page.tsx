'use client'
import { makeSendMessagesUseCase } from "@/factories/useCases/SendMessages";
import { ChatRoom } from "@/presentation/components/templates/ChatRoom";

export default function Home() {
  return <ChatRoom sendMessageUseCase={makeSendMessagesUseCase()} />
}
