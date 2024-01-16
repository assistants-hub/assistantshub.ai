'use client';

import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import { setCredentials } from '@/app/launchpad/client';
import { Credential } from '@/app/types/credential';

export interface CreateCredentialsModalProps {
  open: boolean;
  setOpen: any;
  setCredentialCreated: (b: boolean) => {};
}

export default function CreateCredentialsModal(props: CreateCredentialsModalProps) {
  const [openAiApiKey, setOpenAiApiKey] = useState('');
  const [updatingCredentials, setUpdatingCredentials] = useState(false);

  const handleSetOpenAiApiKey = async () => {
    setUpdatingCredentials(true);
    let setCredentialsResponse = await setCredentials(openAiApiKey);
    props.setCredentialCreated(true);
    setUpdatingCredentials(false);
    props.setOpen(false);
  };

  return (
    <Modal show={props.open} size={'3xl'} onClose={() => props.setOpen(false)}>
      <Modal.Header>Set OpenAI API Key</Modal.Header>
      <Modal.Body>
        <div className='space-y-6 p-6'>
          <div className='flex max-w-3xl flex-col gap-2'>
            <div>
              <TextInput
                id='openAiApiKey'
                placeholder=''
                required
                onChange={(e) => {
                  setOpenAiApiKey(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          gradientDuoTone='purpleToBlue'
          onClick={handleSetOpenAiApiKey}
          disabled={!openAiApiKey}
          isProcessing={updatingCredentials}
        >
          Set
        </Button>
        <Button color='gray' onClick={() => props.setOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
