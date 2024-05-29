import { Message, MessageSenderEnum } from "@/domain/entities/Message"
import { GiRobotAntennas, GiPerson, GiRobotGrab, GiOrbit } from "react-icons/gi";

export interface Props {
  message: Message
}

const senderIcons = [
  {
    sender: MessageSenderEnum.BOT,
    icon: <GiRobotAntennas data-testid="bot-icon" />
  },
  {
    sender: MessageSenderEnum.USER,
    icon: <GiPerson data-testid="user-icon" />
  },
  {
    sender: MessageSenderEnum.SYSTEM,
    icon: <GiRobotGrab data-testid="system-icon" />
  },
]

export const MessageContent = ({ message }: Props) => {
  const senderIcon = senderIcons.find(senderIcon => senderIcon.sender == message.sender)

  return (
    <div className="flex items-center border-b border-gray-600 py-3">
      <div className="pr-2">
        {senderIcon?.icon || <GiOrbit data-testid="default-icon" />}
      </div>
      <p className="text-gray-300">{message.text}</p>
    </div>
  )
}