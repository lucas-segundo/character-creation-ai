import { Chat } from "../../organisms/Chat"
import { Header } from "../../organisms/Header"
import { SendMessageInput } from "../../organisms/SendMessageInput"

export const ChatRoom = () => {
  return (
    <div className="flex flex-col items-center h-dvh">
      <Header />
      <div className="h-full">
        <Chat />
      </div>
      <SendMessageInput />  
    </div>
  )
}