'use client';

import React, { useEffect, useState } from 'react';
import { Badge, Button, Card } from 'flowbite-react';
import { useGetAssistants } from '@/app/assistants/client';
import Image from 'next/image';
import { HiPlus } from 'react-icons/hi';
import CreateAssistantModal from '@/app/assistants/CreateAssistantModal';
import { getImageHash } from '@/app/utils/hash';
import Link from 'next/link';

export default function ListAssistants() {
  const [openCreateAssistantModal, setOpenCreateAssistantModal] =
    useState(false);
  const [assistantCreated, setAssistantCreated] = useState(false);

  let { assistantsLoading, assistants, assistantsEmpty, reload } =
    useGetAssistants();

  useEffect(() => {
    if (assistantCreated) {
      reload('/api/openai/assistants');
    }
  }, [assistantCreated, reload]);

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
          {assistants.map((assistant) => {
            return (
              <Card className='max-w-sm' key={assistant.id}>
                <div className='flex flex-col items-center pb-10'>
                  <Image
                    width={296}
                    height={296}
                    src={
                      '/images/people/' + getImageHash(assistant.id) + '.jpg'
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
                      <Badge color='info'>{assistant.model}</Badge>
                    </div>
                  </span>
                  <span className='pt-4 text-sm text-gray-500 dark:text-gray-400'>
                    {assistant.description}
                  </span>
                  <div className='mt-4 flex space-x-3 lg:mt-6'>
                    <Button gradientDuoTone='greenToBlue'>
                      <Link href={'/assistants/' + assistant.id + '/customize'}>
                        Customize
                      </Link>
                    </Button>
                    <Button color={'light'} onClick={() => {}}>
                      <Link href={'/assistants/' + assistant.id + '/settings'}>
                        Settings
                      </Link>
                    </Button>
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
