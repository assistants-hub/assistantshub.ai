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
  HiChip,
  HiDatabase,
} from 'react-icons/hi';
import { Assistant } from '@/app/types/assistant';
import Image from 'next/image';
import { getImageHash } from '@/app/utils/hash';
import React, { useContext } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import Link from 'next/link';
import { HiPuzzlePiece } from 'react-icons/hi2';

export default function AdminSideNavigation() {
  const { assistant } = useContext(AssistantContext);

  const getAssistantComponentUrl = (
    assistant: Assistant,
    component: string
  ) => {
    if (!assistant) return '';
    return `/assistants/${assistant.id}/${component}`;
  };

  return (
    <div className='flex flex-auto' aria-label='Sidebar'>
      <Sidebar
        aria-label='Sidebar'
        className='z-40 flex flex-auto items-center justify-center'
      >
        <Sidebar.Items className='w-60 bg-gray-100'>
          <Sidebar.Item className={'pt-5'}>
            Administration
          </Sidebar.Item>
          <Sidebar.ItemGroup>
            <Sidebar.Item href={'/admin/dashboard'} icon={HiChartBar}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href={'/admin/plugins'} icon={HiPuzzlePiece}>
              Plugins
            </Sidebar.Item>
            <Sidebar.Item href={'/admin/theme'} icon={HiColorSwatch}>
              Theme
            </Sidebar.Item>
            <Sidebar.Item href={'/admin/providers/model'} icon={HiChip}>
              Model Providers
            </Sidebar.Item>
            <Sidebar.Item href={'/admin/providers/data'} icon={HiDatabase}>
              Data Providers
            </Sidebar.Item>
            <Sidebar.Item href={'/settings'} icon={HiCog}>
              Settings
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.CTA className={'w-60'}>
          <div className='mb-3 flex items-center'>
            <Badge color='red'>Warning</Badge>
          </div>
          <div className='mb-3 text-sm text-cyan-900 dark:text-gray-400'>
            Changing these settings will affect all users for this instance of
            Assistants Hub. Please proceed with caution.
          </div>
        </Sidebar.CTA>
      </Sidebar>
    </div>
  );
}
