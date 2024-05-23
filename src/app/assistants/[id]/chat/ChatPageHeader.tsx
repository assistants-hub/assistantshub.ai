'use client';

import { Card, Dropdown } from 'flowbite-react';
import Image from 'next/image';
import { useContext } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import { getImageHash } from '@/app/utils/hash';

export function ChatPageHeader() {
  const { assistant } = useContext(AssistantContext);

  return (
    <Card className='mx-auto my-auto flex max-w-2xl'>
      <div className='grid grid-cols-12 items-center'>
        <div className='col-span-2'>
          <Image
            className='rounded-full'
            src={
              assistant.avatar
                ? assistant.avatar
                : '/images/people/avatar/' + getImageHash(assistant.id) + '.jpg'
            }
            width={64}
            height={64}
            alt='Assistant'
          />
        </div>
        <div className='col-span-10 items-center justify-center pl-2'>
          <p className='max-w-md text-xl font-semibold leading-relaxed'>
            {assistant.name}
          </p>
          <p className='max-w-md text-sm leading-relaxed'>
            {assistant.description}
          </p>
        </div>
      </div>
    </Card>
  );
}
