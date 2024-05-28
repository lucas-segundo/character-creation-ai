import { mockMessage } from "@/domain/entities/Message/mock"
import { MessageContent } from "../../molecules/MessageContent"

export const Chat = () => {
  return (
    <div className="flex justify-center px-4 w-full text-gray-400">
      <div className="w-[640px] my-4">
        <MessageContent message={mockMessage()} />
        <MessageContent message={mockMessage()} />
        <MessageContent message={mockMessage()} />
        <MessageContent message={mockMessage()} />
        <MessageContent message={mockMessage()} />
        <MessageContent message={mockMessage()} />
      </div>
    </div>
  )
}