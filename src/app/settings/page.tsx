'use client';

import { Tabs } from 'flowbite-react';
import { HiChip } from 'react-icons/hi';
import React from 'react';
import { ModelProviders } from '@/app/settings/ModelProviders';

export default function Settings() {
  return (
    <div className={'stack m-5 h-screen items-center justify-center'}>
      <h3 className='pb-4 text-3xl font-bold dark:text-white'>Settings</h3>
      <p className={'pb-4 text-sm text-gray-400'}>
        Global settings and configurations for use with Assistants
      </p>
      <Tabs aria-label='Tabs with underline' style='underline'>
        <Tabs.Item active title='Model Providers' icon={HiChip}>
          <ModelProviders />
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
