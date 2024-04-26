'use client';

import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import ChatHeader from '@/app/assistants/[id]/chat/ChatHeader';
import ChatMessage from '@/app/assistants/[id]/chat/ChatMessage';
import { Button, Textarea, TextInput } from 'flowbite-react';
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
import ChatPopup from '@/app/assistants/[id]/chat/ChatPopup';

export interface ChatPopupFrameProps extends ChatProps {
  hide: boolean;
  setHide: (minimize: boolean) => void;
}

export default function ChatPopupFrame(props: ChatPopupFrameProps) {
  const { assistant } = useContext(AssistantContext);

  return (
    <>
      <div
        className={
          'border-[ relative m-2 flex max-h-full max-w-md flex-auto rounded-lg border-2 bg-white' +
          getPrimaryColor(assistant) +
          ']'
        }
      >
        <div
          className={'absolute h-48 w-full rounded-t-lg'}
          style={{
            backgroundColor: getPrimaryColor(assistant),
          }}
        ></div>
        <div
          className={
            'flex min-w-[calc(100vw-5rem)] flex-col space-y-4 p-2 md:min-w-max'
          }
        >
          <ChatHeader
            minimize={props.hide}
            setMinimize={props.setHide}
            close={() => {
              // TODO: remove this
            }}
          />
          <ChatPopup hide={props.hide} setHide={props.setHide} />
        </div>
      </div>
    </>
  );
}
