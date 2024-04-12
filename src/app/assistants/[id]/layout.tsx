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
        <div className='bg-grey flex min-h-[calc(100vh-100px)] items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <div className='grid min-h-[calc(100vh-100px)] grid-cols-1 justify-center lg:grid-cols-12'>
          <div className={'col-span-2 m-2 items-center justify-center'}>
            <SideNavigation assistant={assistant} />
          </div>
          <div className={'col-span-10 m-4 items-center justify-center'}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
