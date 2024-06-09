'use client';

import React, { useState } from 'react';
import { Spinner } from 'flowbite-react';
import CreateAssistant from '@/app/assistants/CreateAssistant';
import { useGetAssistants } from '@/app/assistants/client';
import ListAssistants from '@/app/assistants/ListAssistants';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function GetStarted() {
  const { isLoading } = useUser();

  const [assistantCreated, setAssistantCreated] = useState(false);
  const { assistantsLoading, assistants, assistantsEmpty } = useGetAssistants();

  return (
    <>
      {isLoading || assistantsLoading ? (
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
