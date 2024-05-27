import { Header } from "../../organisms/Header"
import { SendMessageInput } from "../../organisms/SendMessageInput"

export const ChatRoom = () => {
  return (
    <div className="flex flex-col justify-between h-dvh">
      <Header />
      <div className="flex justify-center">
        <div className="flex justify-center items-end w-[640px]">
          <SendMessageInput />
        </div>
      </div>
    </div>
  )
}