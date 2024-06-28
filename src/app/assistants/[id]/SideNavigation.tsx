'use client';

import { Avatar, Badge, Button, Card, Sidebar } from 'flowbite-react';
import {
  HiColorSwatch,
  HiChatAlt2,
  HiFolder,
  HiCog,
  HiChartBar,
  HiPuzzle,
  HiShoppingBag,
} from 'react-icons/hi';
import { Assistant } from '@/app/types/assistant';
import Image from 'next/image';
import { getImageHash } from '@/app/utils/hash';
import React, { useContext } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import Link from 'next/link';

export default function SideNavigation() {
  const { assistant } = useContext(AssistantContext);

  const getAssistantComponentUrl = (
    assistant: Assistant,
    component: string
  ) => {
    if (!assistant) return '';
    return `/assistants/${assistant.id}/${component}`;
  };

  return (
    <div className='flex flex-wrap'>
      <div id='logo-sidebar' className='flex flex-auto' aria-label='Sidebar'>
        <Sidebar
          aria-label='Sidebar'
          className='z-40 flex flex-auto items-center justify-center bg-gray-50'
        >
          <Sidebar.Items className='bg-gray-50'>
            <Sidebar.ItemGroup>
              <Card
                key={assistant.id}
                className={'bg-gray-50'}
                imgSrc={'/images/backgrounds/1.jpg'}
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
                <div className='flex flex-col items-center justify-center'>
                  <h5 className='mb-1 text-center text-lg font-medium text-gray-900 dark:text-white'>
                    {assistant.name}
                  </h5>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    <div className='flex self-center'>
                      <Badge color='info'>{assistant.modelId}</Badge>
                    </div>
                  </span>
                  <span className='pt-4 text-xs text-gray-500 dark:text-gray-400'>
                    {assistant.description}
                  </span>
                  <Link href={`/link/${assistant.id}`} target='_blank'>
                    <Button
                      size={'sm'}
                      gradientDuoTone='greenToBlue'
                      className={'float-right mr-2 mt-3 w-[150px]'}
                    >
                      <HiChatAlt2 className={'h-5 w-5'} />
                      Try Assistant
                    </Button>
                  </Link>
                </div>
              </Card>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href={getAssistantComponentUrl(assistant, 'analytics')}
                icon={HiChartBar}
              >
                Analytics
              </Sidebar.Item>
              <Sidebar.Item
                href={getAssistantComponentUrl(assistant, 'conversations')}
                icon={HiChatAlt2}
              >
                Conversations
              </Sidebar.Item>
              <Sidebar.Item
                href={getAssistantComponentUrl(assistant, 'documents')}
                icon={HiFolder}
              >
                Documents
              </Sidebar.Item>
              <Sidebar.Item
                href={getAssistantComponentUrl(assistant, 'customize')}
                icon={HiColorSwatch}
              >
                Customize
              </Sidebar.Item>
              <Sidebar.Item
                href={getAssistantComponentUrl(assistant, 'integrate')}
                icon={HiPuzzle}
              >
                Integrate
              </Sidebar.Item>
              <Sidebar.Item
                href={getAssistantComponentUrl(assistant, 'settings')}
                icon={HiCog}
              >
                Settings
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </div>
  );
}
