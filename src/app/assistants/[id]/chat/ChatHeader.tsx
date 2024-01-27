import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';

export default function ChatHeader(props: ChatProps) {
  return (
    <>
      <div className='z-10 ml-4 flex flex-col text-white'>
        <div className='text-2xl'>{props.assistant.name}</div>
        <div className='text-md w-60 text-gray-200'>
          {props.assistant.description}
        </div>
      </div>
    </>
  );
}
