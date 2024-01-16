'use client';

import React, { useState } from 'react';
import { Card, Button } from 'flowbite-react';
import Image from 'next/image';
import CreateCredentialsModal from '@/app/launchpad/CreateCredentialsModal';

export interface CreateCredentialsProps {
  setCredentialCreated: any;
}

export default function CreateCredentials(props: CreateCredentialsProps) {
  const [openCreateCredentialsModal, setOpenCreateCredentialsModal] =
    useState(false);

  return (
    <div className='bg-grey flex h-[calc(100vh-120px)] items-center justify-center '>
      <Card
        className='max-w-md'
        renderImage={() => (
          <Image
            width={600}
            height={600}
            src='/images/getcredentials.jpg'
            alt='Set Credentials'
          />
        )}
      >
        <p className='text-center font-normal text-gray-700 dark:text-gray-400'>
          Before we can get started, we need an{' '}
          <a
            href={'https://platform.openai.com/docs/quickstart?context=python'}
            className='text-blue-600'
            target='_blank'
          >
            OpenAI API Key
          </a>
          .
        </p>
        <p className='flex self-center'>
          <Button
            gradientDuoTone='purpleToBlue'
            onClick={() => setOpenCreateCredentialsModal(true)}
          >
            Set OpenAI Credentials
          </Button>
        </p>
      </Card>
      <CreateCredentialsModal
        open={openCreateCredentialsModal}
        setOpen={setOpenCreateCredentialsModal}
        setCredentialCreated={props.setCredentialCreated}
      />
    </div>
  );
}
