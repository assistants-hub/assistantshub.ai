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
import { DarkThemeToggle, Flowbite } from "flowbite-react";

export default function Customize() {
  const { assistant, setAssistant } = useContext(AssistantContext);
  const [openModal, setOpenModal] = useState(false);

  return assistant.id ? (
    <div className='max-w-screen flex flex-col gap-4'>
      <h3 className='pb-4 text-3xl font-bold dark:text-white'>Customize</h3>
      <div className='grid md:grid-cols-2'>
        <div className='col-span-1'>
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
                  <div className='space-y-6 p-6'>
                    <Button className='bg-gray-50' outline color={'red'} onClick={() => {
                      setOpenModal(true);
                    }}>
                      Reset to defaults
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <ResetToDefaultsAlert openConfirmationModal={openModal} setOpenConfirmationModal={setOpenModal} handleConfirmation={() => {
          // @ts-ignore
          setAssistant((prevAssistant) => {
            return {
              ...prevAssistant,
              avatar: null,
              profile: null,
              theme: {},
            };
          });
        }}></ResetToDefaultsAlert>
        <div className='group col-span-1 m-auto flex flex-row-reverse items-center justify-center'>
          <ChatPopup hide={false} setHide={() => {}} />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
