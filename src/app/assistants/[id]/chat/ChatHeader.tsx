import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';

export default function ChatHeader(props: ChatProps) {
  return <>
    <div className="flex flex-col z-10 ml-4 text-white">
      <div className="text-2xl">{props.assistant.name}</div>
      <div className="w-60 text-gray-200 text-md">{props.assistant.description}</div>
    </div>
  </>
}