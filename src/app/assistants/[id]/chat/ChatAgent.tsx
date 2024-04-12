'use client';

import ChatPopup from '@/app/assistants/[id]/chat/ChatPopup';
import { Avatar, Dropdown, Spinner, Button } from 'flowbite-react';
import { getImageHash } from '@/app/utils/hash';
import { useGetAssistant } from '@/app/assistants/[id]/client';
import React, { useEffect } from 'react';
import Link from 'next/link';

export interface ChatAgentProps {
  assistant_id: string;
}

export default function ChatAgent(props: ChatAgentProps) {
  const dropDownDiv = React.useRef<HTMLDivElement | null>(null);
  const [showPopup, setShowPopup] = React.useState(false);

  let { assistantLoading, assistantResponse, assistantEmpty, reload } =
    useGetAssistant(props.assistant_id);

  const assistant = assistantResponse;

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

  return (
    <div className='stack items-center justify-center'>
      <div data-dial-init className='group fixed bottom-1 right-1'>
        <div className='flex flex-row-reverse' ref={dropDownDiv}>
          {!showPopup ? (
            <Button
              as='span'
              className='border-transparent bg-transparent'
              onClick={() => handleChatAgentClick()}
            >
              {assistantLoading ? (
                <Spinner color='info' aria-label='Loading assistant..' />
              ) : (
                getAssistantAvatar()
              )}
            </Button>
          ) : (
            <ChatPopup
              assistant={assistant}
              hide={!showPopup}
              setHide={hidePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
}
