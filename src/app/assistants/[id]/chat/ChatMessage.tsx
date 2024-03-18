import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import { getImageHash } from '@/app/utils/hash';
import { HiOutlineUserCircle, HiUserCircle } from 'react-icons/hi';
import { formatRelativeUnixTime } from '@/app/utils/date';
import { Message } from '@/app/types/message';
import Markdown from 'marked-react';
import Image from 'next/image';

export interface ChatMessageProps extends ChatProps {
  message: Message;
  username?: string;
}

export default function ChatMessage(props: ChatMessageProps) {
  return !props.message.role || props.message.role === 'assistant' ? (
    <div className='flex items-end gap-1 justify-self-start'>
      <Image
        className='h-8 w-8 rounded-full'
        src={
          '/images/people/avatar/' + getImageHash(props.assistant.id) + '.jpg'
        }
        width={32}
        height={32}
        alt='Assistant'
      />
      <div className='leading-1.5 flex w-full flex-col rounded-br-xl rounded-tl-xl rounded-tr-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700'>
        <div className='flex items-center space-x-1 rtl:space-x-reverse'>
          <span className='text-sm font-semibold text-gray-900 dark:text-white'>
            {props.assistant.name}
          </span>
          <span className='text-xs font-normal text-gray-400 dark:text-gray-400'>
            {formatRelativeUnixTime(props.message.created_at)}
          </span>
        </div>
        <div className='text-sm font-normal text-gray-900 dark:text-white'>
          <Markdown>{props.message.content[0]?.text?.value as string}</Markdown>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex items-end gap-1 justify-self-start'>
      <div className='leading-1.5 flex w-full flex-col rounded-bl-xl rounded-tl-xl rounded-tr-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700'>
        <div className='flex items-center space-x-2 rtl:space-x-reverse'>
          <span className='text-sm font-semibold text-gray-900 dark:text-white'>
            {props.username ? props.username : 'You'}
          </span>
          <span className='text-xs font-normal text-gray-400 dark:text-gray-400'>
            {formatRelativeUnixTime(props.message.created_at)}
          </span>
        </div>
        <div className='text-sm font-normal text-gray-900 dark:text-white'>
          <Markdown>{props.message.content[0]?.text?.value as string}</Markdown>
        </div>
      </div>
      <div className='flex'>
        <HiUserCircle size={'40'} />
      </div>
    </div>
  );
}
