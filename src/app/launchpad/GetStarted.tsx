'use client';

import React, { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CreateAssistant from '@/app/launchpad/CreateAssistant';
import CreateCredentials from '@/app/launchpad/CreateCredentials';
import { useGetAssistants, useGetCredentials } from '@/app/launchpad/client';
import ListAssistants from '@/app/launchpad/ListAssistants';

export default function GetStarted() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      redirect('api/auth/signin');
    },
  });
  const [credentialCreated, setCredentialCreated] = useState(false);
  const [assistantCreated, setAssistantCreated] = useState(false);
  const { credentialsLoading, credentials, credentialsEmpty } =
    useGetCredentials();
  const { assistantsLoading, assistants, assistantsEmpty } = useGetAssistants();

  useEffect(() => {}, [credentialCreated]);

  return (
    <>
      {status === 'loading' || credentialsLoading || assistantsLoading ? (
        <div className='bg-grey flex h-[calc(100vh-120px)] items-center justify-center '>
          <Spinner />
        </div>
      ) : credentialsEmpty && !credentialCreated ? (
        <CreateCredentials setCredentialCreated={setCredentialCreated} />
      ) : assistantsEmpty && !assistantCreated ? (
        <CreateAssistant />
      ) : (
        <ListAssistants />
      )}
    </>
  );
}
