'use client';

import { Avatar, Badge, Card, Sidebar } from 'flowbite-react';
import {
  HiColorSwatch,
  HiChatAlt2,
  HiCog,
  HiChartBar,
  HiPuzzle,
} from 'react-icons/hi';
import { Assistant } from '@/app/types/assistant';
import Image from 'next/image';
import { getImageHash } from '@/app/utils/hash';
import React, { useContext } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';

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
      <Sidebar
        aria-label='Sidebar'
        className='flex flex-auto items-center justify-center'
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Card key={assistant.id}>
              <div className='flex flex-col items-center'>
                <Image
                  width={296}
                  height={296}
                  src={
                    assistant.profile
                      ? assistant.profile
                      : '/images/people/' + getImageHash(assistant.id) + '.jpg'
                  }
                  alt='Assistant'
                  className='mb-3 rounded-e-lg rounded-s-xl shadow-lg'
                  style={{ width: '100%', height: 'auto' }}
                />
                <br />
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
  );
}
