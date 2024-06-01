'use client';

import React, { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import { redirect } from 'next/navigation';
import CreateAssistant from '@/app/assistants/CreateAssistant';
import {
  setCredentials,
  useGetAssistants,
  useGetCredentials,
} from '@/app/assistants/client';
import ListAssistants from '@/app/assistants/ListAssistants';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function GetStarted() {
  const { user, error, isLoading } = useUser();

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
      {isLoading ||
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
