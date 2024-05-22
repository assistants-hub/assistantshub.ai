import { useContext, useEffect, useState } from 'react';
import { Message } from '@/app/types/message';
import { getInitialPrompt } from '@/app/utils/assistant';
import { getFingerprint } from '@thumbmarkjs/thumbmarkjs';
import { getItemWithExpiry, setItemWithExpiry } from '@/app/utils/store';
import {
  createMessage,
  createRun,
  createThread,
  getMessages,
} from '@/app/assistants/[id]/client';
import { streamAsyncIterator } from '@/app/utils/streamAsyncIterator';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';

export const useChatContext = () => {
  const { assistant } = useContext(AssistantContext);

  const [typedMessage, setTypedMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState('' as string);
  const [streamText, setStreamText] = useState<string>('');
  const [currentThread, setCurrentThread] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [fingerprint, setFingerprint] = useState('');

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
    if (messageStatus === 'in_progress') {
      sendMessageAndPoll().then((r) => {});
    }
  }, [currentMessage]);

  const getModelProviderId = () => {
    return assistant.modelProviderId ? assistant.modelProviderId : 'openai';
  };

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
      setStreamText(messageBuffer);
    }
    const [threadedMessageStatus, threadMessages] = await getMessages(
      assistant.id,
      getModelProviderId(),
      thread || '',
      currentMessageId
    );
    setMessageStatus('completed');
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

  const sendMessage = async () => {
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

  return {
    typedMessage,
    setTypedMessage,
    messageStatus,
    setMessageStatus,
    streamText,
    setStreamText,
    currentThread,
    setCurrentThread,
    currentMessage,
    setCurrentMessage,
    messages,
    setMessages,
    fingerprint,
    setFingerprint,
    sendMessage,
  };
};
