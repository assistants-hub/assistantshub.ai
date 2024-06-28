'use client';

import { Button, Modal, Table, ToggleSwitch } from 'flowbite-react';
import React, { useCallback, useContext, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {
  deleteAssistant,
  updateAuthenticationRequirement,
  updateVisibilityStatus,
} from '@/app/assistants/[id]/client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import EditAssistant from '@/app/assistants/[id]/settings/EditAssistant';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';

export default function Settings() {
  const [openModal, setOpenModal] = useState(false);
  const { assistant } = useContext(AssistantContext);

  const [publish, setPublish] = useState(
    assistant.published ? assistant.published : false
  );

  const [authenticationRequired, setAuthenticationRequired] = useState(
    assistant.authenticatedUsersOnly !== undefined ? assistant.authenticatedUsersOnly : true
  );

  const { push } = useRouter();

  const toggleAuthenticationRequirement = async () => {
    let shouldAuth = !authenticationRequired;
    if (assistant && assistant.id) {
      let [status, response] = await updateAuthenticationRequirement(
        assistant.id
      );
      if (status === 200) {
        let message =
          'Assistant ' +
          assistant.name +
          ' now requires users to be authenticated.';

        if (!shouldAuth) {
          message =
            'Assistant ' + assistant.name + ' now supports anonymous users.';
        }
        // @ts-ignore
        setAuthenticationRequired(shouldAuth);

        toast.success(message, {
          duration: 4000,
        });
      } else {
        toast.error('Assistant ' + assistant.name + ' could not be updated.', {
          duration: 4000,
        });
      }
    }
  };

  const toggleVisibility = async () => {
    let visibility = !publish;
    if (assistant && assistant.id) {
      let [status, response] = await updateVisibilityStatus(assistant.id);
      if (status === 200) {
        let message =
          'Assistant ' + assistant.name + ' now available in marketplace.';

        if (!visibility) {
          message =
            'Assistant ' + assistant.name + ' removed from marketplace.';
        }
        setPublish(visibility);

        toast.success(message, {
          duration: 4000,
        });
      } else {
        toast.error('Assistant ' + assistant.name + ' could not be updated.', {
          duration: 4000,
        });
      }
    }
  };

  const handleAssistantDelete = async () => {
    if (assistant && assistant.id) {
      let [status, response] = await deleteAssistant(assistant.id);
      if (status === 200) {
        toast.success(
          'Assistant ' + assistant.name + ' deleted successfully.',
          {
            duration: 4000,
          }
        );
        setOpenModal(false);
        push('/assistants');
      } else {
        toast.error('Assistant ' + assistant.name + ' could not be deleted.', {
          duration: 4000,
        });
      }
    }
  };

  return (
    <div className='stack ml-5 mt-5 items-center justify-center'>
      <h3 className='pb-4 text-3xl font-bold dark:text-white'>Settings</h3>
      <p className={'pb-4 text-sm text-gray-400'}>
        Adjust the original configuration of your assistant here
      </p>
      <div>
        <Table className='flex flex-auto items-center justify-start self-center'>
          <Table.Body className='divide-y'>
            <Table.Row className='bg-white'>
              <div className='flex max-w-7xl flex-col gap-4'>
                <h1 className='p-2 pl-5 text-xl font-bold'>General Settings</h1>
              </div>
            </Table.Row>
            <Table.Row className='bg-white'>
              <EditAssistant assistant={assistant} />
            </Table.Row>
            <Table.Row className='bg-white'>
              <div className='flex max-w-7xl flex-col gap-4'>
                <h1 className='p-2 pl-5 text-xl font-bold'>Access Controls</h1>
              </div>
            </Table.Row>
            <Table.Row className='bg-white'>
              <Table.Cell className='flex max-w-7xl flex-row gap-4 p-5 font-medium text-gray-900 dark:text-white'>
                <div className='p2 flex max-w-md flex-col items-start'>
                  <h2 className='p2 text-lg text-gray-700'>
                    Requires Authentication
                  </h2>
                  <h3 className='p2 text-xs text-gray-400'>
                    When enabled this assistant will require users to
                    authenticate.
                  </h3>
                </div>
                <div className='p2 ml-auto flex max-w-md items-center justify-center'>
                  <ToggleSwitch
                    checked={authenticationRequired}
                    onChange={toggleAuthenticationRequirement}
                  />
                </div>
              </Table.Cell>
              <Table.Cell className='flex max-w-7xl flex-row gap-4 p-5 font-medium text-gray-900 dark:text-white'>
                <div className='p2 flex max-w-md flex-col items-start'>
                  <h2 className='p2 text-lg text-gray-700'>
                    Publish in Marketplace
                  </h2>
                  <h3 className='p2 text-xs text-gray-400'>
                    When enabled this assistant will be visible on the
                    marketplace.
                  </h3>
                </div>
                <div className='p2 ml-auto flex max-w-md items-center justify-center'>
                  <ToggleSwitch checked={publish} onChange={toggleVisibility} />
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row className='bg-white'>
              <div className='flex max-w-7xl flex-col gap-4'>
                <h1 className='p-2 pl-5 text-xl font-bold'>Danger Zone</h1>
              </div>
            </Table.Row>
            <Table.Row className='bg-white'>
              <Table.Cell className='flex max-w-7xl flex-row gap-4 p-5 font-medium text-gray-900 dark:text-white'>
                <div>
                  <h2 className='p2 text-lg text-gray-700'>
                    Delete this assistant
                  </h2>
                  <h3 className='p2 text-xs text-gray-400'>
                    Once you delete this assistant, there is no going back.
                    Please be certain.
                  </h3>
                </div>
                <div className='p2 ml-auto flex max-w-md items-center justify-center pl-10'>
                  <Button
                    outline
                    gradientDuoTone='pinkToOrange'
                    onClick={() => setOpenModal(true)}
                  >
                    Delete
                  </Button>
                </div>
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
              <Button color='failure' onClick={handleAssistantDelete}>
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
