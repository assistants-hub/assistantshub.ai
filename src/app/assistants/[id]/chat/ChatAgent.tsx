'use client';

import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import ChatPopup from '@/app/assistants/[id]/chat/ChatPopup';
import { Avatar, Dropdown, Spinner, Textarea } from 'flowbite-react';
import { getImageHash } from '@/app/utils/hash';
import { useGetAssistant } from '@/app/assistants/[id]/client';

export interface ChatAgentProps {
  assistant_id: string;
}

export default function ChatAgent(props: ChatAgentProps) {
  let { assistantLoading, assistant, assistantEmpty, reload } = useGetAssistant(
    props.assistant_id
  );

  const getAssistantAvatar = () => {
    if (assistant) {
      return (
        <Avatar
          img={
            '/images/people/avatar/' + getImageHash(props.assistant_id) + '.jpg'
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
      <div data-dial-init className='group fixed bottom-10 right-10'>
        <div className='flex flex-row-reverse pt-5'>
          <Dropdown
            label={
              assistantLoading ? (
                <Spinner color='info' aria-label='Loading assistant..' />
              ) : (
                getAssistantAvatar()
              )
            }
            placement={'top-end'}
            arrowIcon={false}
            inline={true}
            dismissOnClick={false}
            className='border-transparent bg-transparent'
          >
            {!assistantLoading ? <ChatPopup assistant={assistant} /> : <></>}
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
