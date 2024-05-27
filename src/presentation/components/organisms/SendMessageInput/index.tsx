import { MdSend } from "react-icons/md";

export const SendMessageInput = () => {
  return (
    <div className="border border-gray-800 bg-black w-[640px] p-6 rounded">
      <div className="flex justify-between items-center border border-gray-800 p-4 rounded">
        <input className="mr-2 text-gray-400 bg-black w-full focus:outline-none" name="full_name" placeholder="Send a message"/>
        <MdSend size={25} color="white"/>
      </div>
    </div>
  )
}