'use client';

import React, { useEffect, useState } from 'react';
import { Button, Label, Modal } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import { setCredentials } from '@/app/assistants/client';
import { toast } from 'react-hot-toast';

export interface UseSystemCredentialsModalProps {
  open: boolean;
  setOpen: any;
  setCredentialCreated: (b: boolean) => {};
}

export default function UseSystemCredentialsModal(
  props: UseSystemCredentialsModalProps
) {
  const [apiKeyError, setApiKeyError] = useState('');
  const [updatingCredentials, setUpdatingCredentials] = useState(false);

  const handleSetOpenAiApiKey = async () => {
    setUpdatingCredentials(true);
    let [status, response] = await setCredentials('use-default');

    if (status === 201) {
      props.setCredentialCreated(true);
      setUpdatingCredentials(false);
      toast.success('OpenAI API Key added successfully.', { duration: 4000 });
      props.setOpen(false);
    } else {
      setApiKeyError(response?.message);
      setUpdatingCredentials(false);
    }
  };

  useEffect(() => {}, [apiKeyError]);

  return (
    <Modal show={props.open} size={'3xl'} onClose={() => props.setOpen(false)}>
      <Modal.Header>Use Keys from Assistants Hub</Modal.Header>
      <Modal.Body>
        <div className='space-y-2 p-6'>
          <div className='flex max-w-3xl flex-col gap-2'>
            <div className='block'>
              <Label htmlFor='openAiApiKey'>
                I am OK with using OpenAI API Key provided by Assistant Hub and
                accept the terms and conditions.
              </Label>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          gradientDuoTone='purpleToBlue'
          onClick={handleSetOpenAiApiKey}
          isProcessing={updatingCredentials}
        >
          Agree and Continue
        </Button>
        <Button color='gray' onClick={() => props.setOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
