import { MessageContent } from "../../molecules/MessageContent"
import { Message } from "@/domain/entities/Message"

interface Props {
  messages: Message[]
}

export const Chat = ({ messages }: Props) => {
  return (
    <div className="flex justify-center px-4 w-full text-gray-400">
      <div className="w-[640px] my-4">
        {messages.map((message) => <MessageContent key={message.id} message={message} />)}
      </div>
    </div>
  )
}