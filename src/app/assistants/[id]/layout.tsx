'use client';

import React from 'react';
import { useGetAssistant } from '@/app/assistants/[id]/client';
import { Spinner } from 'flowbite-react';
import SideNavigation from '@/app/assistants/[id]/SideNavigation';

export default function AssistantsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  let { assistantLoading, assistant, assistantEmpty, reload } = useGetAssistant(
    params.id
  );

  return (
    <div className='p10'>
      {assistantLoading ? (
        <div className='bg-grey flex h-[calc(100vh-120px)] items-center justify-center '>
          <Spinner />
        </div>
      ) : (
        <div className='flex grid grid-cols-2 p-10'>
          <SideNavigation assistant={assistant} />
          {children}
        </div>
      )}
    </div>
  );
}
