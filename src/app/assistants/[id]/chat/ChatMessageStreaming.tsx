import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import { getImageHash } from '@/app/utils/hash';
import Markdown from 'marked-react';
import Image from 'next/image';
import React, { useEffect } from 'react';

export interface ChatMessageStreamingProps extends ChatProps {
  message: string;
}

export default function ChatMessageStreaming(props: ChatMessageStreamingProps) {
  return (
    <div className='flex items-end gap-1 justify-self-start'>
      <Image
        className='h-8 w-8 rounded-full'
        src={
          props.assistant.avatar
            ? props.assistant.avatar
            : '/images/people/avatar/' +
              getImageHash(props.assistant.id) +
              '.jpg'
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
        </div>
        <div className='text-sm font-normal text-gray-900 dark:text-white'>
          <Markdown>{props.message}</Markdown>
        </div>
      </div>
    </div>
  );
}
