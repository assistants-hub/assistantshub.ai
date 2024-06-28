'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Dropdown,
  DropdownItem,
} from 'flowbite-react';
import { useGetAssistants } from '@/app/assistants/client';
import Image from 'next/image';
import {
  HiChartBar,
  HiChatAlt2,
  HiCog,
  HiColorSwatch,
  HiFolder,
  HiGlobeAlt,
  HiLink,
  HiOutlineLockClosed,
  HiPlus,
  HiPuzzle,
} from 'react-icons/hi';
import CreateAssistantModal from '@/app/assistants/CreateAssistantModal';
import { getImageHash } from '@/app/utils/hash';
import Link from 'next/link';

export default function ListAssistants() {
  const [openCreateAssistantModal, setOpenCreateAssistantModal] =
    useState(false);
  const [assistantCreated, setAssistantCreated] = useState(false);

  let { assistantsLoading, assistants, assistantsEmpty, mutate } =
    useGetAssistants();

  useEffect(() => {
    if (assistantCreated) {
      assistantsLoading = true;
      mutate().then(() => {
        assistantsLoading = false;
      });
    }
  }, [assistantCreated]);

  return (
    <div className='flex min-h-[calc(100vh-160px)] flex-col xs:p-2 sm:p-10'>
      <div>
        <Button
          className='float-right'
          gradientDuoTone='greenToBlue'
          onClick={() => setOpenCreateAssistantModal(true)}
        >
          <HiPlus className='mr-2 h-5 w-5' /> Create Assistant
        </Button>
      </div>
      <div className='bg-grey mb-5 mt-10 mt-5 flex grid flex-auto items-start justify-center'>
        <div
          className='4xl:grid-cols-4 grid
                             grid-cols-1
                             gap-12
                             md:grid-cols-2
                             xl:grid-cols-3
                             2xl:grid-cols-4
                             3xl:grid-cols-5'
        >
          {assistants &&
            assistants.length &&
            assistants.map((assistant, index) => {
              return (
                <div
                  className={'max-w-xs bg-gray-100 tracking-tight'}
                  key={index}
                >
                  <Card
                    imgSrc={'/images/backgrounds/1.jpg'}
                    className={'bg-gray-80'}
                  >
                    <Avatar
                      img={
                        assistant.avatar
                          ? assistant.avatar
                          : '/images/people/avatar/' +
                            getImageHash(assistant.id) +
                            '.jpg'
                      }
                      alt='avatar'
                      size='xl'
                      color='success'
                      rounded
                      className={'pb-1'}
                    />
                    <div className='flex flex-col items-center'>
                      {assistant.authenticatedUsersOnly ? (
                        <HiOutlineLockClosed />
                      ) : (
                        <HiGlobeAlt />
                      )}
                      <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                        {assistant.name}
                      </h5>
                      <span className='text-sm text-gray-500 dark:text-gray-400'>
                        <div className='flex gap-1 self-center'>
                          <Badge color='gray'>{assistant.modelId}</Badge>
                          <Badge color={assistant.published ? 'green' : 'red'}>
                            {assistant.published ? 'Listed' : 'Private'}
                          </Badge>
                        </div>
                      </span>
                      <span className='max-h-12 min-h-12 max-w-xs overflow-y-hidden pt-4 text-center text-sm text-xs text-gray-500 dark:text-gray-400'>
                        {assistant.description}
                      </span>
                      <div className='mt-4 flex items-center justify-center gap-1'>
                        <Link href={`/link/${assistant.id}`} target='_blank'>
                          <Button
                            gradientDuoTone='greenToBlue'
                            className={'mr-2 w-[150px]'}
                          >
                            <HiChatAlt2 className={'h-5 w-5'} />
                            Try Assistant
                          </Button>
                        </Link>
                        <Dropdown
                          label='Options'
                          color={'light'}
                          placement='top'
                        >
                          <DropdownItem
                            icon={HiChartBar}
                            href={`/assistants/${assistant.id}/analytics`}
                          >
                            Analytics
                          </DropdownItem>
                          <DropdownItem
                            icon={HiChatAlt2}
                            href={`/assistants/${assistant.id}/conversations`}
                          >
                            Conversations
                          </DropdownItem>
                          <DropdownItem
                            icon={HiFolder}
                            href={`/assistants/${assistant.id}/documents`}
                          >
                            Documents
                          </DropdownItem>
                          <DropdownItem
                            icon={HiColorSwatch}
                            href={`/assistants/${assistant.id}/customize`}
                          >
                            Customize
                          </DropdownItem>
                          <DropdownItem
                            icon={HiPuzzle}
                            href={`/assistants/${assistant.id}/integrate`}
                          >
                            Integrate
                          </DropdownItem>
                          <DropdownItem
                            icon={HiCog}
                            href={`/assistants/${assistant.id}/settings`}
                          >
                            Settings
                          </DropdownItem>
                        </Dropdown>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
      <CreateAssistantModal
        open={openCreateAssistantModal}
        setOpen={setOpenCreateAssistantModal}
        setAssistantCreated={setAssistantCreated}
      />
    </div>
  );
}
