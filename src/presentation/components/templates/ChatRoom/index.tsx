import { SendMessageInput } from "../../organisms/SendMessageInput"

export const ChatRoom = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-end w-[640px] h-screen">
        <SendMessageInput />
      </div>
    </div>
  )
}