'use client';

import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import ChatHeader from '@/app/assistants/[id]/chat/ChatHeader';
import ChatMessage from '@/app/assistants/[id]/chat/ChatMessage';
import { getStyleHash } from '@/app/utils/hash';
import { Button, Textarea } from 'flowbite-react';
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/app/types/message';
import {
  createAndRunThread,
  getMessages,
  getRun,
} from '@/app/assistants/[id]/client';
import ChatTyping from '@/app/assistants/[id]/chat/ChatTyping';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function ChatPopup(props: ChatProps) {
  const [typedMessage, setTypedMessage] = useState('');
  const [messageRunInProgress, setMessageRunInProgress] = useState(false);
  const [messageStatus, setMessageStatus] = useState('' as string);
  const [messages, setMessages] = useState<Message[]>([
    {
      created_at: Date.now() / 1000,
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: {
            value: 'Hello, I am your assistant. How can I help you?',
            annotations: [],
          },
        },
      ],
    },
  ]);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesRef?.current && 'scrollIntoView' in messagesRef.current) {
      messagesRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }

    if (messageStatus === 'in_progress') {
      sendMessageAndPoll().then(() => {
        setMessageStatus('completed');
      });
    }
  }, [messages]);

  const sendMessageAndPoll = async () => {
    let [status, runResponse] = await createAndRunThread(
      props.assistant.id,
      messages
    );
    console.log(runResponse);

    do {
      await sleep(1000);
      // @ts-ignore
      [status, runResponse] = await getRun(
        props.assistant.id,
        runResponse.thread_id,
        runResponse.id
      );
      console.log(runResponse);
    } while (
      runResponse.status === 'in_progress' ||
      runResponse.status === 'queued' ||
      runResponse.status === 'cancelling'
    );

    let [threadedMessageStatus, threadMessages] = await getMessages(
      props.assistant.id,
      runResponse.thread_id
    );

    let newMessages:Message[] = [];

    //@ts-ignore
    threadMessages.data.forEach((message) => {
      newMessages.push({
        created_at: message.created_at,
        role: message.role,
        content: message.content,
      });
    });

    console.log(newMessages);

    setMessageRunInProgress(false);
    setMessages([...newMessages]);
  };

  const handleSendMessage = async () => {
    if (!typedMessage || !typedMessage.trim() || typedMessage.length <= 0) {
      return;
    }
    setMessages([
      ...messages,
      {
        created_at: Date.now() / 1000,
        role: 'user',
        content: [
          {
            type: 'text',
            text: {
              value: typedMessage,
              annotations: [],
            },
          },
        ],
      },
    ]);
    setTypedMessage('');
    setMessageRunInProgress(true);
    setMessageStatus('in_progress' as string);
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
                        assistant={props.assistant}
                        message={message}
                      />
                    );
                  })}
                  {messageRunInProgress ? (
                    <ChatTyping assistant={props.assistant} />
                  ) : (
                    <></>
                  )}
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
            {messageRunInProgress ? (
              <span className='text-xs font-normal text-gray-500 dark:text-white'>
                {props.assistant.name} is typing...
              </span>
            ) : (
              <></>
            )}
            <div className='flex items-center rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700'>
              <Textarea
                className='mx-4 block w-full rounded-lg border bg-white text-sm text-gray-900 dark:text-white dark:placeholder-gray-400'
                placeholder='Your message...'
                readOnly={false}
                disabled={messageRunInProgress}
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
                  typedMessage.length <= 0 ||
                  messageRunInProgress
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
