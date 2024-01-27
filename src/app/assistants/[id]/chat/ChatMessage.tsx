import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import { getImageHash } from '@/app/utils/hash';
import { HiOutlineUserCircle, HiUserCircle } from 'react-icons/hi';

export interface ChatMessageProps extends ChatProps {
  from?: 'user' | 'assistant';
  message: string;
}

export default function ChatMessage(props: ChatMessageProps) {
  return !props.from || props.from === 'assistant' ? (
    <div className='flex items-end gap-1 justify-self-start'>
      <img
        className='h-8 w-8 rounded-full'
        src={
          '/images/people/avatar/' + getImageHash(props.assistant.id) + '.jpg'
        }
        alt='Assistant'
      />
      <div className='leading-1.5 flex w-full max-w-[320px] flex-col rounded-br-xl rounded-tl-xl rounded-tr-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700'>
        <div className='flex items-center space-x-2 rtl:space-x-reverse'>
          <span className='text-sm font-semibold text-gray-900 dark:text-white'>
            {props.assistant.name}
          </span>
          <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
            11:46
          </span>
        </div>
        <p className='text-sm font-normal text-gray-900 dark:text-white'>
          {props.message}
        </p>
      </div>
    </div>
  ) : (
    <div className='flex items-end gap-1 justify-self-start'>
      <div className='leading-1.5 flex w-full max-w-[320px] flex-col rounded-bl-xl rounded-tl-xl rounded-tr-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700'>
        <div className='flex items-center space-x-2 rtl:space-x-reverse'>
          <span className='text-sm font-semibold text-gray-900 dark:text-white'>
            You
          </span>
          <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
            11:46
          </span>
        </div>
        <p className='text-sm font-normal text-gray-900 dark:text-white'>
          {props.message}
        </p>
      </div>
      <div className='flex'>
        <HiUserCircle size={'40'} />
      </div>
    </div>
  );
}
