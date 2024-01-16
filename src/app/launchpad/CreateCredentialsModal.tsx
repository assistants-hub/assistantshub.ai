'use client';

import React, { useEffect, useState } from 'react';
import { Button, Label, Modal } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import { setCredentials } from '@/app/launchpad/client';
import { toast } from 'react-hot-toast';

export interface CreateCredentialsModalProps {
  open: boolean;
  setOpen: any;
  setCredentialCreated: (b: boolean) => {};
}

export default function CreateCredentialsModal(
  props: CreateCredentialsModalProps
) {
  const [openAiApiKey, setOpenAiApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState('');
  const [updatingCredentials, setUpdatingCredentials] = useState(false);

  const handleSetOpenAiApiKey = async () => {
    setUpdatingCredentials(true);
    let [status, response] = await setCredentials(openAiApiKey);

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
      <Modal.Header>Set OpenAI API Key</Modal.Header>
      <Modal.Body>
        <div className='space-y-6 p-6'>
          <div className='flex max-w-3xl flex-col gap-2'>
            <div className='mb-2 block'>
              <Label htmlFor='openAiApiKey'>
                <a
                  href='https://help.openai.com/en/articles/4936850-where-do-i-find-my-api-key'
                  className='text-blue-600'
                  target='_blank'
                >
                  Where do I find my API key?
                </a>
              </Label>
            </div>
            <div>
              <TextInput
                id='openAiApiKey'
                placeholder=''
                required
                onChange={(e) => {
                  setApiKeyError('');
                  setOpenAiApiKey(e.target.value);
                }}
                color={apiKeyError ? 'failure' : ''}
                helperText={apiKeyError ? apiKeyError : ''}
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
