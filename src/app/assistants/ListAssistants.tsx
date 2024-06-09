'use client';

import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Dropdown, DropdownItem } from 'flowbite-react';
import { useGetAssistants } from '@/app/assistants/client';
import Image from 'next/image';
import {
  HiChartBar,
  HiChatAlt2,
  HiCog,
  HiColorSwatch,
  HiFolder,
  HiLink,
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
      mutate([...assistants, assistantCreated]).then(() => {
        assistantsLoading = false;
      });
    }
  }, [assistantCreated]);

  return (
    <div className='flex grid min-h-[calc(100vh-160px)] grid-cols-1 p-10'>
      <div>
        <Button
          className='float-right'
          gradientDuoTone='purpleToBlue'
          onClick={() => setOpenCreateAssistantModal(true)}
        >
          <HiPlus className='mr-2 h-5 w-5' /> Create Assistant
        </Button>
      </div>
      <div className='bg-grey flex items-start justify-center'>
        <div className='grid grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-16 2xl:grid-cols-4'>
          {assistants &&
            assistants.length &&
            assistants.map((assistant) => {
              return (
                <Card className='max-w-sm' key={assistant.id}>
                  <div className='pb flex flex-col items-center'>
                    <Image
                      width={296}
                      height={296}
                      src={
                        assistant.profile
                          ? assistant.profile
                          : '/images/people/' +
                            getImageHash(assistant.id) +
                            '.jpg'
                      }
                      alt='Assistant'
                      className='mb-3 rounded-e-lg rounded-s-xl shadow-lg'
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                      {assistant.name}
                    </h5>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      <div className='flex self-center'>
                        <Badge color='info'>{assistant.modelId}</Badge>
                      </div>
                    </span>
                    <span className='pt-4 text-sm text-gray-500 dark:text-gray-400'>
                      {assistant.description}
                    </span>
                    <div className='mt-4 flex space-x-3 lg:mt-6'>
                      <Link href={`/link/${assistant.id}`} target='_blank'>
                        <Button gradientDuoTone='greenToBlue'>
                          <HiLink className='mr-2 h-5 w-5' /> Go to Assistant
                        </Button>
                      </Link>
                      <Dropdown label='Options' color={'light'} placement='top'>
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
