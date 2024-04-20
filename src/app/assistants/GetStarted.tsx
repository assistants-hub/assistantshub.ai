'use client';

import React, { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CreateAssistant from '@/app/assistants/CreateAssistant';
import CreateCredentials from '@/app/assistants/CreateCredentials';
import {
  setCredentials,
  useGetAssistants,
  useGetCredentials,
} from '@/app/assistants/client';
import ListAssistants from '@/app/assistants/ListAssistants';

export default function GetStarted() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      redirect('api/auth/signin');
    },
  });
  const [blocked, setBlocked] = useState(true);
  const [assistantCreated, setAssistantCreated] = useState(false);
  const { credentialsLoading, credentials, credentialsEmpty } =
    useGetCredentials();
  const { assistantsLoading, assistants, assistantsEmpty } = useGetAssistants();

  useEffect(() => {
    if (!credentialsLoading && credentialsEmpty) {
      setBlocked(true);
      setCredentials('use-default').then((response) => {
        // Wait till credentials are created.
        setBlocked(false);
      });
    }

    if (credentials && credentials.length) {
      setBlocked(false);
    }
  }, [credentialsLoading]);

  return (
    <>
      {status === 'loading' ||
      blocked ||
      credentialsLoading ||
      assistantsLoading ? (
        <div className='bg-grey flex h-[calc(100vh-120px)] items-center justify-center '>
          <Spinner />
        </div>
      ) : assistantsEmpty && !assistantCreated ? (
        <CreateAssistant />
      ) : (
        <ListAssistants />
      )}
    </>
  );
}
