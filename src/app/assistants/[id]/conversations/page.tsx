'use client';

import { useGetThreads } from '@/app/assistants/[id]/client';
import { Button, Spinner, Table } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { formatRelativeUnixTime } from '@/app/utils/date';
import { HiChatAlt2 } from 'react-icons/hi';
import ChatConversation from '@/app/assistants/[id]/conversations/ChatConversation';
import { Thread } from '@/app/types/thread';
import UserLocation from '@/app/assistants/[id]/conversations/UserLocation';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';

export default function Conversations() {
  const { assistant } = useContext(AssistantContext);
  const [openModal, setOpenModal] = useState(false);
  const [currentThread, setCurrentThread] = useState(null as Thread | null);

  let { threadsLoading, threads, threadsEmpty } = useGetThreads(assistant.id);

  return assistant.id ? (
    !threadsLoading ? (
      <div className='max-w-screen flex max-h-full flex-col gap-4'>
        <h3 className='text-3xl font-bold dark:text-white'>Conversations</h3>
        <p className={'pb-4 text-sm text-gray-400'}>
          Logs of your assistant&apos;s conversations are available below
        </p>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <Table hoverable className='flex-auto self-center'>
            <Table.Head>
              <Table.HeadCell>Thread</Table.HeadCell>
              <Table.HeadCell>Messages</Table.HeadCell>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Device</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {threads && threads.length ? (
                threads.map((thread) => (
                  <Table.Row
                    key={thread.id}
                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                  >
                    <Table.Cell>
                      <span className='font-semibold text-gray-700'>
                        {thread.id}
                      </span>
                      <br />
                      <span className='font-small text-gray-400'>
                        {formatRelativeUnixTime(thread.created_at)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <a
                        href='#'
                        className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                      >
                        <Button
                          type='submit'
                          className='inline-flex cursor-pointer justify-center p-1 dark:hover:bg-gray-600'
                          color={'gray'}
                          onClick={() => {
                            setOpenModal(true);
                            setCurrentThread(thread);
                          }}
                        >
                          <HiChatAlt2 size={'20'} />
                        </Button>
                      </a>
                    </Table.Cell>
                    <Table.Cell>
                      {thread.metadata && thread.metadata.user
                        ? thread.metadata.user
                        : 'Anonymous'}
                    </Table.Cell>
                    <Table.Cell>
                      {thread.metadata && thread.metadata.fingerprint
                        ? thread.metadata.fingerprint
                        : ''}
                    </Table.Cell>
                    <Table.Cell>
                      <UserLocation metadata={thread.metadata} />
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <></>
              )}
            </Table.Body>
          </Table>
        </div>
        <ChatConversation
          openModal={openModal}
          setOpenModal={setOpenModal}
          thread={currentThread}
        />
      </div>
    ) : (
      <div className='bg-grey flex min-h-[calc(100vh-100px)] items-center justify-center '>
        <Spinner />
      </div>
    )
  ) : (
    <></>
  );
}
