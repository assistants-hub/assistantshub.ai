'use client';

import React, { useState } from 'react';
import { Card, Button, Spinner } from 'flowbite-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CreateAssistant from '@/app/launchpad/CreateAssistant';

export default function GetStarted() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      redirect('api/auth/signin');
    },
  });
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {status === 'loading' ? (
        <div className='bg-grey flex h-[calc(100vh-120px)] items-center justify-center '>
          <Spinner />
        </div>
      ) : (
        <div className='bg-grey flex h-[calc(100vh-120px)] items-center justify-center '>
          <Card
            className='max-w-md'
            renderImage={() => (
              <Image
                width={600}
                height={600}
                src='/images/getstarted.jpg'
                alt='Get Started'
              />
            )}
          >
            <p className='text-center font-normal text-gray-700 dark:text-gray-400'>
              An Assistant has instructions and can leverage models, tools, and
              knowledge to respond to users through conversations.
            </p>
            <p className='flex self-center'>
              <Button
                gradientDuoTone='purpleToBlue'
                onClick={() => setOpenModal(true)}
              >
                Create Assistant
              </Button>
            </p>
          </Card>
          <CreateAssistant open={openModal} setOpen={setOpenModal} />
        </div>
      )}
    </>
  );
}
