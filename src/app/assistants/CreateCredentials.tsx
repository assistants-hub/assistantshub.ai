'use client';

import React, { useState } from 'react';
import { Card, Button } from 'flowbite-react';
import Image from 'next/image';
import CreateCredentialsModal from '@/app/assistants/CreateCredentialsModal';
import UseSystemCredentialsModal from '@/app/assistants/UseSystemCredentialsModal';

export interface CreateCredentialsProps {
  setCredentialCreated: any;
}

export default function CreateCredentials(props: CreateCredentialsProps) {
  const [openCreateCredentialsModal, setOpenCreateCredentialsModal] =
    useState(false);

  const [openSystemCredentialsModal, setOpenSystemCredentialsModal] =
    useState(false);

  return (
    <div className='bg-grey flex h-[calc(100vh-120px)] items-center justify-center '>
      <Card
        className='max-w-xl'
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
        <p className='flex gap-4 self-center'>
          <Button
            gradientDuoTone='purpleToBlue'
            onClick={() => setOpenSystemCredentialsModal(true)}
          >
            Assistant Hub's Open API Key
          </Button>
          <Button
            color='gray'
            onClick={() => setOpenCreateCredentialsModal(true)}
          >
           My OpenAI API Key
          </Button>
        </p>
      </Card>
      <CreateCredentialsModal
        open={openCreateCredentialsModal}
        setOpen={setOpenCreateCredentialsModal}
        setCredentialCreated={props.setCredentialCreated}
      />
      <UseSystemCredentialsModal
        open={openSystemCredentialsModal}
        setOpen={setOpenSystemCredentialsModal}
        setCredentialCreated={props.setCredentialCreated}
      />
    </div>
  );
}
