'use client';

import ChatAgent from '@/app/assistants/[id]/chat/ChatAgent';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import React, { useContext, useEffect } from 'react';
import { Table } from 'flowbite-react';
import AvatarCropUpload from '@/app/assistants/[id]/customize/AvatarCropUpload';
import ProfileCropUpload from '@/app/assistants/[id]/customize/ProfileCropUpload';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import ChatAgentContextWrapper from '@/app/assistants/[id]/chat/ChatAgentContextWrapper';
import ChatPopup from '@/app/assistants/[id]/chat/ChatPopup';

export default function Customize() {
  const { assistant } = useContext(AssistantContext);

  useEffect(() => {
    hljs.highlightAll();
  });

  return assistant.id ? (
    <div className='max-w-screen flex flex-col gap-4'>
      <h3 className='pb-4 text-3xl font-bold dark:text-white'>Customize</h3>
      <div className='grid md:grid-cols-2'>
        <div className='col-span-1'>
          <Table className='max-w-3xl flex-auto'>
            <Table.Body className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  <AvatarCropUpload />
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  <ProfileCropUpload />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <div className='group col-span-1 ml-auto flex flex-row-reverse items-center justify-center'>
          <ChatPopup hide={false} setHide={() => {}} />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
