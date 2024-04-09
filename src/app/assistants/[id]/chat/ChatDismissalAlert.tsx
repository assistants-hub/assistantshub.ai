'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';

export interface ChatDisMissalAlertProps {
  openConfirmationModal: boolean;
  setOpenConfirmationModal: (minimize: boolean) => void;
  handleDismissal: (minimize: boolean) => void;
}
export default function ChatDisMissalAlert(props: ChatDisMissalAlertProps) {
  const handleConfirmation = (confirmed: boolean) => {
    props.handleDismissal(confirmed);
    props.setOpenConfirmationModal(false);
  };

  return (
    <>
      <Modal
        show={props.openConfirmationModal}
        size='lg'
        onClose={() => props.setOpenConfirmationModal(false)}
        popup
      >
        <Modal.Body>
          <div className='pt-10 text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              This will delete the conversation and all its messages. Are you
              sure you want to continue?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => handleConfirmation(true)}>
                {'Yes'}
              </Button>
              <Button color='gray' onClick={() => handleConfirmation(false)}>
                {'No'}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
