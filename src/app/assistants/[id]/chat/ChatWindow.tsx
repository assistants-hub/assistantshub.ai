'use client';

import ChatPopup from '@/app/assistants/[id]/chat/ChatPopup';
import { Spinner } from 'flowbite-react';
import { useGetAssistant } from '@/app/assistants/[id]/client';
import React, { useEffect, useState } from 'react';
import { Assistant } from '@/app/types/assistant';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import ChatPopupFrame from '@/app/assistants/[id]/chat/ChatPopupFrame';

export interface ChatWindowProps {
  assistant_id: string;
  frameless?: boolean;
}

export default function ChatWindow(props: ChatWindowProps) {
  const dropDownDiv = React.useRef<HTMLDivElement | null>(null);
  const [frameless, setFrameless] = React.useState(props.frameless ? props.frameless : false);

  let { assistantLoading, assistantResponse, assistantEmpty, reload } =
    useGetAssistant(props.assistant_id);

  const [loading, setLoading] = useState(true);
  const [assistant, setAssistant] = useState<Assistant>(assistantResponse);

  useEffect(() => {
    console.log('assistantResponse', assistantResponse);
    if (assistantResponse) {
      setAssistant(assistantResponse);
      setLoading(false);
    }
  }, [assistantLoading]);

  const changeAssistant = async (assistant: Assistant) => {
    setAssistant(assistant);
    // We don't allow changes from the end-user so this is a no-op
  };

  return (
    <div className='stack items-center justify-center'>
      <div data-dial-init className={'group'}>
        <div className='flex items-center justify-center' ref={dropDownDiv}>
          {loading ? (
            <Spinner
              color='info'
              aria-label='Loading assistant..'
              className={'self-center p-10'}
            />
          ) : (
            <AssistantContext.Provider
              value={{ assistant, setAssistant: changeAssistant }}
            >
              {frameless ? (
                <ChatPopup hide={false} setHide={null} />
              ) : (
                <ChatPopupFrame hide={false} setHide={null} />
              )}

            </AssistantContext.Provider>
          )}
        </div>
      </div>
    </div>
  );
}
