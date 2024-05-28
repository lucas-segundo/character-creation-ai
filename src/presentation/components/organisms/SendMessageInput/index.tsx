import { useState } from "react";
import { MdSend } from "react-icons/md";

interface OnSendParams {
  text: string | null
}

interface Props {
  onSend: (params: OnSendParams) => void
}

export const SendMessageInput = ({ onSend }: Props) => {
  const [text, setText] = useState('')
  return (
    <div className="flex justify-center px-4 w-full">      
      <div className="border border-gray-800 bg-black w-[640px] p-6 rounded">
        <div className="flex justify-between items-center border border-gray-800 p-4 rounded">
          <input 
            className="mr-2 text-gray-400 bg-black w-full focus:outline-none" 
            name="full_name" 
            placeholder="Send a message"
            onChange={(event) => setText(event.currentTarget.value)}
          />
          <MdSend onClick={() => onSend({ text })} size={25} color="white"/> 
        </div>
      </div>
    </div>
  )
}