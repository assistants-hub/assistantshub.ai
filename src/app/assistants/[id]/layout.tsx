'use client';

import React, { useEffect, useState } from 'react';
import { useGetAssistant } from '@/app/assistants/[id]/client';
import { Spinner } from 'flowbite-react';
import SideNavigation from '@/app/assistants/[id]/SideNavigation';
import { Assistant } from '@/app/types/assistant';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';

export default function AssistantsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  let { assistantLoading, assistantResponse, assistantEmpty, reload } =
    useGetAssistant(params.id);
  const [loading, setLoading] = useState(true);
  const [assistant, setAssistant] = useState<Assistant>(assistantResponse);

  useEffect(() => {
    console.log(assistantResponse);
    if (assistantResponse) {
      setAssistant(assistantResponse);
      setLoading(false);
    }
  }, [assistantResponse]);

  return (
    <div className='p10'>
      {loading ? (
        <div className='bg-grey flex min-h-[calc(100vh-100px)] items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <div className='grid min-h-[calc(100vh-100px)] grid-cols-1 justify-center lg:grid-cols-12'>
          <AssistantContext.Provider value={{ assistant, setAssistant }}>
            <div className={'col-span-2 m-2 items-center justify-center'}>
              <SideNavigation />
            </div>
            <div className={'col-span-10 m-4 items-center justify-center'}>
              {children}
            </div>
          </AssistantContext.Provider>
        </div>
      )}
    </div>
  );
}
