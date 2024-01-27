import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import { getImageHash } from '@/app/utils/hash';
import { HiOutlineUserCircle, HiUserCircle } from 'react-icons/hi';

export interface ChatMessageProps extends ChatProps {
  from?: "user" | "assistant";
  message: string;
}

export default function ChatMessage(props:ChatMessageProps) {
  return (
    !props.from || props.from === "assistant" ?
      <div className="flex justify-self-start items-end gap-1">
        <img className="w-8 h-8 rounded-full" src={"/images/people/avatar/" + getImageHash(props.assistant.id) + ".jpg"}
             alt="Assistant" />
        <div
          className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-tl-xl rounded-tr-xl rounded-br-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{props.assistant.name}</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
          </div>
          <p className="text-sm font-normal text-gray-900 dark:text-white">{props.message}</p>
        </div>
      </div> :
      <div className="flex justify-self-start items-end gap-1">
        <div
          className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-tl-xl rounded-tr-xl rounded-bl-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">You</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
          </div>
          <p className="text-sm font-normal text-gray-900 dark:text-white">{props.message}</p>
        </div>
        <div className="flex">
          <HiUserCircle size={"40"} />
        </div>
      </div>
  );
}