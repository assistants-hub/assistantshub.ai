'use client';

import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import ChatHeader from '@/app/assistants/[id]/chat/ChatHeader';
import ChatMessage from '@/app/assistants/[id]/chat/ChatMessage';
import { getStyleHash } from '@/app/utils/hash';
import { Button, Textarea } from 'flowbite-react';
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/app/types/message';

export default function ChatPopup(props: ChatProps) {
  const [typedMessage, setTypedMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello, I am your assistant. How can I help you?',
    },
    {
      role: 'user',
      content: 'Hello I need som help.',
    },
  ]);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesRef?.current && 'scrollIntoView' in messagesRef.current) {
      messagesRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!typedMessage || !typedMessage.trim() || typedMessage.length <= 0) {
      return;
    }
    setMessages([
      ...messages,
      {
        role: 'user',
        content: typedMessage,
      },
    ]);
    setTypedMessage('');
  };

  return (
    <>
      <div className='relative flex max-h-full w-96 rounded-lg bg-white'>
        <div
          className={'absolute z-0 h-48 w-full rounded-t-lg'}
          style={{
            backgroundColor: getStyleHash(props.assistant.id).primaryColor,
          }}
        ></div>
        <div className='flex flex-col space-y-4 p-4'>
          <ChatHeader assistant={props.assistant} />
          <div
            className='z-10 rounded border-0 border-t-4 text-sm shadow-md'
            style={{
              borderColor: getStyleHash(props.assistant.id).secondaryColor,
            }}
          >
            <div className='flex flex-col space-y-2 rounded-b rounded-t-none border border-t-0'>
              <div className='max-h-72 flex-grow-0 overflow-y-auto bg-white'>
                <div
                  className='flex flex-col gap-3 px-6 py-4'
                  ref={messagesRef}
                >
                  {messages.map((message: Message, index) => {
                    return (
                      <ChatMessage
                        key={index}
                        role={message.role}
                        assistant={props.assistant}
                        content={message.content}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div
            className='z-101 rounded border-0 border-t-4 shadow-md'
            style={{
              borderColor: getStyleHash(props.assistant.id).secondaryColor,
            }}
          >
            <div className='flex items-center rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700'>
              <Textarea
                className='mx-4 block w-full rounded-lg border bg-white text-sm text-gray-900 dark:text-white dark:placeholder-gray-400'
                placeholder='Your message...'
                readOnly={false}
                value={typedMessage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    handleSendMessage();
                  }
                  e.stopPropagation();
                }}
                onChange={(event) => {
                  setTypedMessage(event.target.value);
                }}
              ></Textarea>
              <Button
                type='submit'
                className='inline-flex cursor-pointer justify-center rounded-full p-2 dark:hover:bg-gray-600'
                style={{ color: getStyleHash(props.assistant.id).primaryColor }}
                disabled={
                  !typedMessage ||
                  !typedMessage.trim() ||
                  typedMessage.length <= 0
                }
                color={'gray'}
                onClick={handleSendMessage}
              >
                <svg
                  className='h-5 w-5 rotate-90 rtl:-rotate-90'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 18 20'
                >
                  <path d='m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z' />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
