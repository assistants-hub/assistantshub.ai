'use client';

import 'highlight.js/styles/github.css';
import React, { useContext, useState } from 'react';
import { Button, Table } from 'flowbite-react';
import AvatarCropUpload from '@/app/assistants/[id]/customize/AvatarCropUpload';
import ProfileCropUpload from '@/app/assistants/[id]/customize/ProfileCropUpload';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import ChatPopup from '@/app/assistants/[id]/chat/ChatPopup';
import ThemeSelections from '@/app/assistants/[id]/customize/ThemeSelections';
import ResetToDefaultsAlert from '@/app/assistants/[id]/customize/ResetToDefaultsAlert';
import { EditInitialPrompt } from '@/app/assistants/[id]/customize/EditInitialPrompt';
import { EditMessageLabel } from '@/app/assistants/[id]/customize/EditMessageLabel';
import ChatPopupFrame from '@/app/assistants/[id]/chat/ChatPopupFrame';
import ChatPage from '@/app/assistants/[id]/chat/ChatPage';
import { EditConversationStarters } from '@/app/assistants/[id]/customize/EditConversationStarters';

export default function Customize() {
  const { assistant, setAssistant } = useContext(AssistantContext);
  const [openModal, setOpenModal] = useState(false);

  return assistant.id ? (
    <div className='max-w-screen ml-5 mt-5 flex flex-col gap-4'>
      <h3 className='text-3xl font-bold dark:text-white'>Customize</h3>
      <p className={'pb-4 text-sm text-gray-400'}>
        Adjust the look and feel of your assistant to match your preferences
      </p>
      <div className='grid gap-5 md:grid-cols-2'>
        <div className='col-span-1 max-h-[100vh] overflow-y-auto'>
          <Table className='max-w-3xl flex-auto'>
            <Table.Body className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  <AvatarCropUpload />
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  <ProfileCropUpload />
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  <ThemeSelections />
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  <EditConversationStarters />
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  <EditInitialPrompt />
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  <EditMessageLabel />
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  <div className='space-y-6'>
                    <Button
                      outline
                      gradientDuoTone='pinkToOrange'
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      Reset to defaults
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <ResetToDefaultsAlert
          openConfirmationModal={openModal}
          setOpenConfirmationModal={setOpenModal}
          handleConfirmation={() => {
            // @ts-ignore
            setAssistant({
              ...assistant,
              avatar: null,
              profile: null,
              theme: null,
            });
          }}
        ></ResetToDefaultsAlert>
        <div className='group col-span-1 flex max-h-[400vh] items-start justify-start'>
          <ChatPage short={true} />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
