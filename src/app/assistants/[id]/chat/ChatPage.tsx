import { Button, TextInput } from 'flowbite-react';
import React, { useContext, useEffect, useRef } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import { useChatContext } from '@/app/assistants/[id]/chat/useChatContext';
import { getInputMessageLabel, getPrimaryColor } from '@/app/utils/assistant';
import { ChatPageHeader } from '@/app/assistants/[id]/chat/ChatPageHeader';
import { Message } from '@/app/types/message';
import ChatMessage from '@/app/assistants/[id]/chat/ChatMessage';
import ChatMessageStreaming from '@/app/assistants/[id]/chat/ChatMessageStreaming';
import ChatTyping from '@/app/assistants/[id]/chat/ChatTyping';

export default function ChatPage() {
  const { assistant } = useContext(AssistantContext);

  const bottomRef = useRef(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const {
    typedMessage,
    setTypedMessage,
    messageStatus,
    streamText,
    messages,
    sendMessage,
  } = useChatContext();

  useEffect(() => {
    if (messagesRef?.current && 'scrollIntoView' in messagesRef.current) {
      messagesRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // @ts-ignore
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [streamText]);

  return (
    <div key='1' className='flex h-screen flex-col'>
      <div className='flex space-y-4 bg-gray-100 pb-2 pt-1'>
        <ChatPageHeader />
      </div>
      <div className='flex-grow space-y-4 overflow-auto p-4 py-0 pt-0'>
        <div className='mx-auto flex max-w-2xl flex-col rounded-b rounded-t-none'>
          <div className={'max-w-2xl overflow-y-auto'}>
            <div
              className='flex flex-col gap-3 self-center overflow-y-auto px-4 py-2'
              ref={messagesRef}
            >
              {messages.map((message: Message, index) => {
                return <ChatMessage key={index} message={message} />;
              })}
              {streamText ? (
                <>
                  <ChatMessageStreaming
                    message={streamText}
                  ></ChatMessageStreaming>
                  <div ref={bottomRef} />
                </>
              ) : (
                <></>
              )}
              {messageStatus === 'in_progress' && !streamText ? (
                <ChatTyping />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='z-100 mx-auto w-full max-w-2xl rounded-lg border border-2 bg-white p-6 shadow md:w-[800px]'>
        {messageStatus === 'in_progress' ? (
          <span className='text-xs font-normal text-gray-500 dark:text-white'>
            {assistant.name} is typing...
          </span>
        ) : (
          <></>
        )}
        <div className='items-top flex space-x-2'>
          <TextInput
            className='block w-full rounded-lg border bg-white text-sm text-gray-900 dark:text-white dark:placeholder-gray-400'
            placeholder={getInputMessageLabel(assistant)}
            readOnly={false}
            disabled={messageStatus === 'in_progress'}
            value={typedMessage}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                sendMessage();
              }
              e.stopPropagation();
            }}
            onChange={(event) => {
              setTypedMessage(event.target.value);
            }}
          ></TextInput>
          <Button
            as='span'
            className='inline-flex cursor-pointer justify-center border-transparent bg-transparent'
            style={{
              color: getPrimaryColor(assistant),
            }}
            onClick={sendMessage}
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
  );
}
