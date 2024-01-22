'use client';

import { Button, Modal, Table } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useParams } from 'next/navigation';
import { useGetAssistant } from '@/app/assistants/[id]/client';

export default function Configure() {
  const [openModal, setOpenModal] = useState(false);
  const params = useParams<{ id: string }>();
  let { assistantLoading, assistant, assistantEmpty, reload } = useGetAssistant(
    params.id
  );

  const handleAssistantDelete = () => {
    setOpenModal(true);
  };

  return (
    <div className='stack items-center justify-center'>
      <h1 className='p-2 pl-5 text-2xl font-bold'>Danger Zone</h1>
      <div>
        <Table className='flex-auto self-center'>
          <Table.Body className='divide-y'>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                <h2 className='p2 text-lg text-gray-800'>
                  Delete this assistant
                </h2>
                <h3 className='p2 text-gray-400'>
                  Once you delete this assistant, there is no going back. Please
                  be certain.
                </h3>
              </Table.Cell>
              <Table.Cell>
                <Button
                  outline
                  gradientDuoTone='pinkToOrange'
                  onClick={handleAssistantDelete}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <Modal
        show={openModal}
        size='md'
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this assistant{' '}
              <a className='font-bold'>{assistant.name}</a>?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => setOpenModal(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color='gray' onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
