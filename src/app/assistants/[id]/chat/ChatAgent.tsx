'use client';

import { Avatar, Dropdown, Spinner, Button } from 'flowbite-react';
import { getImageHash } from '@/app/utils/hash';
import { updateAssistant, useGetAssistant } from '@/app/assistants/[id]/client';
import React, { useEffect, useState } from 'react';
import { Assistant } from '@/app/types/assistant';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import ChatPopupFrame from '@/app/assistants/[id]/chat/ChatPopupFrame';
import { useRouter } from 'next/navigation';
import Unauthenticated from '@/components/Unauthenticated';

export interface ChatAgentProps {
  assistant_id: string;
  fixed?: boolean;
}

export default function ChatAgent(props: ChatAgentProps) {
  const dropDownDiv = React.useRef<HTMLDivElement | null>(null);
  const [showPopup, setShowPopup] = React.useState(false);
  const [fixed, setFixed] = React.useState(props.fixed ? props.fixed : false);

  let { assistantLoading, assistantResponse, assistantEmpty, reload } =
    useGetAssistant(props.assistant_id);

  const [loading, setLoading] = useState(true);
  const [assistant, setAssistant] = useState<Assistant>(assistantResponse);

  const { push } = useRouter();

  useEffect(() => {
    if (assistantResponse) {
      setAssistant(assistantResponse);
      // @ts-ignore
      if (assistantResponse && assistantResponse.message) {
        push('/api/auth/login?returnTo=/embed/' + props.assistant_id);
      }
      setLoading(false);
    }
  }, [assistantLoading]);

  useEffect(() => {
    // TODO: This is a hack to open the dropdown on page load
    // @ts-lint:disable-next-line no-unresolved-method-or-function
    // @ts-ignore
    //dropDownDiv.current?.firstChild?.click();
  }, [dropDownDiv]);

  const handleChatAgentClick = () => {
    if (!showPopup) {
      setShowPopup(true);
    }
  };

  const hidePopup = () => {
    setShowPopup(false);
  };

  const getAssistantAvatar = () => {
    if (assistant) {
      return (
        <Avatar
          img={
            assistant.avatar
              ? assistant.avatar
              : '/images/people/avatar/' +
                getImageHash(props.assistant_id) +
                '.jpg'
          }
          alt='avatar'
          size='lg'
          status='online'
          statusPosition='top-right'
          color='success'
          rounded
        />
      );
    }
  };

  const changeAssistant = async (assistant: Assistant) => {
    setAssistant(assistant);
    // We don't allow changes from the end-user so this is a no-op
  };

  return (
    <div className='stack items-center justify-center'>
      <div
        data-dial-init
        className={!fixed ? 'group fixed bottom-1 right-1' : 'group'}
      >
        <div className='flex flex-row-reverse' ref={dropDownDiv}>
          {!showPopup ? (
            <Button
              as='span'
              className='border-transparent bg-transparent'
              onClick={() => handleChatAgentClick()}
            >
              {loading ? (
                <Spinner color='info' aria-label='Loading assistant..' />
              ) : (
                getAssistantAvatar()
              )}
            </Button>
          ) : assistant.id ? (
            <AssistantContext.Provider
              value={{ assistant, setAssistant: changeAssistant }}
            >
              <ChatPopupFrame hide={!showPopup} setHide={hidePopup} />
            </AssistantContext.Provider>
          ) : (
            <Unauthenticated />
          )}
        </div>
      </div>
    </div>
  );
}
