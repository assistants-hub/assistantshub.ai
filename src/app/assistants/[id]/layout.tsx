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
        <div className='bg-grey flex min-h-[calc(100vh-100px)] items-center justify-center '>
          <Spinner />
        </div>
      ) : (
        <div className='flex grid min-h-[calc(100vh-100px)] sm:grid-cols-1 md:grid-cols-5'>
          <div className={'col-span-1 items-center'}>
            <SideNavigation assistant={assistant} />
          </div>
          <div
            className={
              'items-center justify-center p-5 sm:col-span-1 md:col-span-4'
            }
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
