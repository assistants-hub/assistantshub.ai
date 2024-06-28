'use client';

import React, { useState } from 'react';
import { Card, Button } from 'flowbite-react';
import Image from 'next/image';
import CreateAssistantModal from '@/app/assistants/CreateAssistantModal';

export default function CreateAssistant() {
  const [openCreateAssistantModal, setOpenCreateAssistantModal] =
    useState(false);

  return (
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
            gradientDuoTone='greenToBlue'
            onClick={() => setOpenCreateAssistantModal(true)}
          >
            Create Assistant
          </Button>
        </p>
      </Card>
      <CreateAssistantModal
        open={openCreateAssistantModal}
        setOpen={setOpenCreateAssistantModal}
      />
    </div>
  );
}
