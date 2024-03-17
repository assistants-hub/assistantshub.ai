'use client';

import { useParams } from 'next/navigation';
import { useGetAssistant, useGetThreads } from '@/app/assistants/[id]/client';
import { Spinner, Table } from 'flowbite-react';
import React from 'react';
import { formatRelativeUnixTime } from '@/app/utils/date';
import Image from 'next/image';

function getLocation(metadata: any) {
  let location = '';
  if (metadata && metadata.city) {
    location = metadata.city;
  }
  let country = metadata && metadata.country ? metadata.country : '';
  if (country) {
    if (location) location += ', ';
    location += country;
  }

  return (
    <div className='items-between flex justify-center p-4'>
      {country ? (
        <div className='self-center'>
          <Image
            alt={`${country} flag`}
            className='rounded-full'
            src={`https://flagcdn.com/96x72/${country.toLowerCase()}.png`}
            // src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
            width={32}
            height={32}
          />
        </div>
      ) : (
        <></>
      )}
      <div className='ml-4 mr-auto text-left'>
        <h5 className='text-gray-700'>{location ? location : 'Unknown'}</h5>
      </div>
    </div>
  );
}

export default function Conversations() {
  const params = useParams<{ id: string }>();
  let { assistantLoading, assistant, assistantEmpty } = useGetAssistant(
    params.id
  );

  let useGetThreads1 = useGetThreads(params.id);
  let { threadsLoading, threads, threadsEmpty } = useGetThreads1;

  return assistant.id ? (
    !threadsLoading ? (
      <div className='max-w-screen flex flex-col gap-4'>
        <h3 className='pb-4 text-3xl font-bold dark:text-white'>
          Conversations
        </h3>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <Table hoverable className='flex-auto self-center'>
            <Table.Head>
              <Table.HeadCell>Thread</Table.HeadCell>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Device</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {threads.map((thread) => (
                <Table.Row
                  key={thread.id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell>
                    <span className='font-semibold text-gray-700'>{thread.id}</span>
                      <br />
                    <span className='font-small text-gray-400'>
                      {formatRelativeUnixTime(thread.created_at)}
                    </span>
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
                  <Table.Cell>{getLocation(thread.metadata)}</Table.Cell>
                  <Table.Cell>
                    <a
                      href='#'
                      className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                    >
                      View
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
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
