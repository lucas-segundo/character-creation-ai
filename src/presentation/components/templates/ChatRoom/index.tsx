import { Chat } from "../../organisms/Chat"
import { Header } from "../../organisms/Header"
import { SendMessageInput } from "../../organisms/SendMessageInput"

export const ChatRoom = () => {
  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <Chat />
      </div>
      <SendMessageInput />  
    </div>
  )
}