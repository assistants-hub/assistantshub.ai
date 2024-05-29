import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import { getImageHash } from '@/app/utils/hash';
import Markdown from 'react-markdown';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';

export interface ChatMessageStreamingProps extends ChatProps {
  message: string;
}

export default function ChatMessageStreaming(props: ChatMessageStreamingProps) {
  const { assistant } = useContext(AssistantContext);

  return (
    <div className='flex items-end gap-1 justify-self-start'>
      <Image
        className='h-8 w-8 rounded-full'
        src={
          assistant.avatar
            ? assistant.avatar
            : '/images/people/avatar/' + getImageHash(assistant.id) + '.jpg'
        }
        width={32}
        height={32}
        alt='Assistant'
      />
      <div className='leading-1.5 flex w-full flex-col rounded-br-xl rounded-tl-xl rounded-tr-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700'>
        <div className='flex items-center space-x-1 rtl:space-x-reverse'>
          <span className='text-sm font-semibold text-gray-900 dark:text-white'>
            {assistant.name}
          </span>
        </div>
        <div className='text-sm font-normal text-gray-900 dark:text-white'>
          <Markdown>{props.message}</Markdown>
        </div>
      </div>
    </div>
  );
}
