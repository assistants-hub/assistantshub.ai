import { Button, Modal, Spinner } from 'flowbite-react';
import { Thread } from '@/app/types/thread';
import React, { useEffect, useState } from 'react';
import { getMessagesForThread } from '@/app/assistants/[id]/client';
import { Assistant } from '@/app/types/assistant';
import { Message } from '@/app/types/message';
import ChatMessage from '@/app/assistants/[id]/chat/ChatMessage';
import UserLocation from '@/app/assistants/[id]/conversations/UserLocation';

export interface ChatMessageProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  thread: Thread | null;
  assistant: Assistant;
}

export default function ChatConversation(props: ChatMessageProps) {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setLoading(true);
    if (props.thread) {
      getMessagesForThread(
        props.assistant?.id?.toString() || '',
        props.thread.id
      ).then(([status, response]) => {
        let collection = [];
        for (let i = 0; i < response.data.length; i++) {
          collection.push(response.data[i]);
        }
        setLoading(false);
        setMessages(collection);
      });
    }
  }, [props.thread]);

  return (
    <Modal
      dismissible
      show={props.openModal}
      onClose={() => props.setOpenModal(false)}
    >
      <Modal.Header className='text-md'>
        {props.thread ? props.thread.id : ''}
        <p className='text-sm'>
          <UserLocation metadata={props.thread?.metadata} />
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className='flex flex-col space-y-2 rounded-b rounded-t-none border border-t-0'>
          <div
            className={
              'max-h-[calc(100vh-30rem)] min-h-[calc(100vh-30rem)] self-center overflow-y-auto bg-white'
            }
          >
            {loading ? (
              <div className='flex items-center justify-center pt-10 '>
                <Spinner />
              </div>
            ) : (
              <div className='flex max-w-4xl flex-col gap-3 self-center overflow-y-auto px-6 py-4'>
                {messages &&
                  messages.length &&
                  messages.map((message, index) => {
                    return (
                      <ChatMessage
                        key={index}
                        message={message}
                        username={'Anonymous'}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
