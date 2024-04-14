'use client';

import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export interface ResetToDefaultsAlertProps {
  openConfirmationModal: boolean;
  setOpenConfirmationModal: (minimize: boolean) => void;
  handleConfirmation: (minimize: boolean) => void;
}
export default function ResetToDefaultsAlert(props: ResetToDefaultsAlertProps) {
  const handleConfirmation = (confirmed: boolean) => {
    props.handleConfirmation(confirmed);
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
              Resetting will restore default settings and remove all
              customizations. Do you want to proceed?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => handleConfirmation(true)}>
                {'Confirm'}
              </Button>
              <Button color='gray' onClick={() => handleConfirmation(false)}>
                {'Cancel'}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
