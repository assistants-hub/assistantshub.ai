'use client';

import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import ChatMessage from '@/app/assistants/[id]/chat/ChatMessage';
import { Button, TextInput } from 'flowbite-react';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Message } from '@/app/types/message';
import {
  createMessage,
  createRun,
  createThread,
  getMessages,
} from '@/app/assistants/[id]/client';
import ChatTyping from '@/app/assistants/[id]/chat/ChatTyping';
import { getFingerprint } from '@thumbmarkjs/thumbmarkjs';
import { streamAsyncIterator } from '@/app/utils/streamAsyncIterator';
import parseEventsFromChunk from '@/app/utils/parseEventsFromChunk';
import ChatMessageStreaming from '@/app/assistants/[id]/chat/ChatMessageStreaming';
import {
  getItemWithExpiry,
  removeItem,
  setItemWithExpiry,
} from '@/app/utils/store';
import ChatDisMissalAlert from '@/app/assistants/[id]/chat/ChatDismissalAlert';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import {
  getInitialPrompt,
  getInputMessageLabel,
  getPrimaryColor,
  getSecondaryColor,
} from '@/app/utils/assistant';

export interface ChatPopupProps extends ChatProps {
  hide: boolean;
  setHide: ((minimize: boolean) => void) | null;
}

export default function ChatPopup(props: ChatPopupProps) {
  const { assistant } = useContext(AssistantContext);
  const bottomRef = useRef(null);
  const [typedMessage, setTypedMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState('' as string);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [streamText, setStreamText] = useState<string>('');
  const [currentThread, setCurrentThread] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [fingerprint, setFingerprint] = useState('');

  const getModelProviderId = () => {
    return assistant.modelProviderId ? assistant.modelProviderId : 'openai';
  };

  useEffect(() => {
    setMessages([
      {
        created_at: Date.now() / 1000,
        role: 'assistant',
        content: [
          {
            type: 'text',
            text: {
              value: getInitialPrompt(assistant),
              annotations: [],
            },
          },
        ],
      },
    ]);
  }, [assistant]);

  useEffect(() => {
    getFingerprint()
      .then((fingerprint) => {
        setFingerprint(fingerprint);
      })
      .catch((error) => {
        console.error(error);
      });

    // Check to see if there is a thread in the session storage
    let threadId = getItemWithExpiry<string>(getAssistantThreadStorageKey());
    if (threadId) {
      setCurrentThread(threadId);
      getMessages(assistant.id, getModelProviderId(), threadId || '', '').then(
        ([threadedMessageStatus, threadMessages]) => {
          const newMessages: Message[] = threadMessages.data;
          setStreamText('');
          setMessages([...messages, ...newMessages]);
        }
      ); // eslint-disable-line
    }
  }, []);

  useEffect(() => {
    if (messagesRef?.current && 'scrollIntoView' in messagesRef.current) {
      messagesRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (messageStatus === 'in_progress') {
      sendMessageAndPoll().then((r) => {});
    }
  }, [currentMessage]);

  useEffect(() => {
    // @ts-ignore
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [streamText]);

  const sendMessageAndPoll = async () => {
    if (!currentMessage) {
      return;
    }
    // If thread doesn't exist create thread
    let thread = currentThread;
    if (!thread) {
      let [status, threadResponse] = await createThread(
        assistant.id,
        getModelProviderId(),
        fingerprint
      );
      thread = threadResponse.id;
      setCurrentThread(threadResponse.id);
      setItemWithExpiry(
        getAssistantThreadStorageKey(),
        threadResponse.id,
        24 * 60 * 60 * 1000
      );
    }

    // Send message to thread
    let [messageStatus, messageResponse] = await createMessage(
      assistant.id,
      getModelProviderId(),
      thread,
      currentMessage
    );
    let currentMessageId = messageResponse.id;

    // Run the thread
    let runResponse = await createRun(
      assistant.id,
      getModelProviderId(),
      thread
    );

    let textDecoder = new TextDecoder();
    let messageBuffer = '';
    for await (const chunk of streamAsyncIterator(runResponse)) {
      const result = textDecoder.decode(chunk);
      messageBuffer = messageBuffer + result;
      console.log(messageBuffer);
      setStreamText(messageBuffer);
    }
    const [threadedMessageStatus, threadMessages] = await getMessages(
      assistant.id,
      getModelProviderId(),
      thread || '',
      currentMessageId
    );
    setMessageStatus('completed');
    console.log('threadedMessages', threadMessages);
    const newMessages: Message[] = threadMessages.data;
    if (newMessages.length > 0) {
      setStreamText('');
      setMessages([...messages, ...newMessages]);
    } else {
      // Something wrong happened here, no new messages, but we just streamed text
      console.log(
        'TODO: No new messages, but we just streamed text, check this'
      );
      //TODO: There should be a way to handle this error
    }
  };

  const handleSendMessage = async () => {
    if (!typedMessage || !typedMessage.trim() || typedMessage.length <= 0) {
      return;
    }
    let message: Message = {
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
    };
    setCurrentMessage(message);
    setMessages([...messages, message]);
    setTypedMessage('');
    setMessageStatus('in_progress' as string);
  };

  const getAssistantThreadStorageKey = () => {
    return `ai.assistantshub.assistant.${assistant.id}.thread`;
  };

  const closeChatPopup = (confirmation: boolean) => {
    if (confirmation) {
      removeItem(getAssistantThreadStorageKey());
      props.setHide ? props.setHide(true) : null;
    }
  };

  return (
    <div className='items-center justify-center self-center'>
      <div className={'flex flex-col space-y-4 p-2'}>
        <div
          className={
            'relative z-10 max-w-md items-center justify-center self-center'
          }
        >
          <div
            className='rounded border-0 border-t-4 text-sm shadow-md'
            style={{
              borderColor: getSecondaryColor(assistant),
            }}
          >
            <div className='flex max-w-sm flex-col rounded-b rounded-t-none border border-t-0'>
              <div
                className={
                  'max-h-[calc(100vh-50vh)] min-h-[calc(100vh-50vh)] max-w-md overflow-y-auto bg-white'
                }
              >
                <div
                  className='flex max-w-md flex-col gap-3 self-center overflow-y-auto px-4 py-4'
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
          <div
            className='z-101 rounded border-0 border-t-4 shadow-md'
            style={{
              borderColor: getSecondaryColor(assistant),
            }}
          >
            {messageStatus === 'in_progress' ? (
              <span className='text-xs font-normal text-gray-500 dark:text-white'>
                {assistant.name} is typing...
              </span>
            ) : (
              <></>
            )}
            <ChatDisMissalAlert
              openConfirmationModal={openConfirmationModal}
              setOpenConfirmationModal={setOpenConfirmationModal}
              handleDismissal={closeChatPopup}
            />
            <div className='flex items-center justify-center rounded-lg bg-gray-50 px-2 py-2 dark:bg-gray-700'>
              <TextInput
                className='block w-full rounded-lg border bg-white text-sm text-gray-900 dark:text-white dark:placeholder-gray-400'
                placeholder={getInputMessageLabel(assistant)}
                readOnly={false}
                disabled={messageStatus === 'in_progress'}
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
              ></TextInput>
              {/* // @ts-ignore */}
              <Button
                as='span'
                className='inline-flex cursor-pointer justify-center border-transparent bg-transparent'
                style={{
                  color: getPrimaryColor(assistant),
                }}
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
    </div>
  );
}
