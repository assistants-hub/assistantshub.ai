'use client';

import { useParams } from 'next/navigation';
import { useGetAssistant, useGetThreads } from '@/app/assistants/[id]/client';
import { Spinner, Table } from 'flowbite-react';
import React from 'react';
import { formatRelativeUnixTime } from '@/app/utils/date';


export default function Conversations() {
  const params = useParams<{ id: string }>();
  let { assistantLoading, assistant, assistantEmpty } = useGetAssistant(
    params.id
  );

  let useGetThreads1 = useGetThreads(
    params.id
  );
  let { threadsLoading, threads, threadsEmpty } = useGetThreads1;

  return assistant.id ? (
    !threadsLoading ? (
    <div className='max-w-8xl flex flex-col gap-4'>
      <h3 className='pb-4 text-3xl font-bold dark:text-white'>Conversations</h3>
      <div className="overflow-x-auto text-2xl">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Thread</Table.HeadCell>
            <Table.HeadCell>Started At</Table.HeadCell>
            <Table.HeadCell>User</Table.HeadCell>
            <Table.HeadCell>Device</Table.HeadCell>
            <Table.HeadCell>Location</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">View Conversation</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {
              threads.map((thread) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{thread.id}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {formatRelativeUnixTime(thread.created_at)}
                  </Table.Cell>
                  <Table.Cell>{thread.metadata.user ? thread.metadata.user : 'Anonymous'}</Table.Cell>
                  <Table.Cell>{thread.metadata.fingerprint ? thread.metadata.fingerprint : ''}</Table.Cell>
                  <Table.Cell>{thread.metadata.city ? thread.metadata.city : ''}</Table.Cell>
                  <Table.Cell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      View Conversation
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    </div>
  ) : (<div className='bg-grey flex min-h-[calc(100vh-100px)] items-center justify-center '>
      <Spinner />
    </div>)) :
    (
      <></>
    );
}
