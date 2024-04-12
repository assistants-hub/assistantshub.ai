'use client';

import { useParams } from 'next/navigation';
import { useGetAssistant } from '@/app/assistants/[id]/client';
import ChatAgent from '@/app/assistants/[id]/chat/ChatAgent';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import React, { useEffect } from 'react';
import { Table } from 'flowbite-react';
import AvatarCropUpload from '@/app/assistants/[id]/customize/AvatarCropUpload';
import ProfileCropUpload from '@/app/assistants/[id]/customize/ProfileCropUpload';

export default function Customize() {
  const params = useParams<{ id: string }>();
  let { assistantLoading, assistant, assistantEmpty, reload } = useGetAssistant(
    params.id
  );

  useEffect(() => {
    hljs.highlightAll();
  });

  return assistant.id ? (
    <div className='max-w-screen flex flex-col gap-4'>
      <ChatAgent assistant_id={assistant.id} />
      <h3 className='pb-4 text-3xl font-bold dark:text-white'>Customize</h3>
      <div>
        <Table className='max-w-3xl flex-auto'>
          <Table.Body className='divide-y'>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>
                <AvatarCropUpload assistant={assistant} />
              </Table.Cell>
            </Table.Row>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>
                <ProfileCropUpload assistant={assistant} />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  ) : (
    <></>
  );
}
