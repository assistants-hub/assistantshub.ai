'use client';

import React, { useEffect, useState } from 'react';
import { updateAssistant, useGetAssistant } from '@/app/assistants/[id]/client';
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
    if (assistantResponse) {
      setAssistant(assistantResponse);
      setLoading(false);
    }
  }, [assistantResponse]);

  const changeAssistant = async (assistant: Assistant) => {
    setAssistant(assistant);
    await updateAssistant(assistant);
  };

  return (
    <div className='p10'>
      {loading ? (
        <div className='bg-grey flex min-h-[calc(100vh-100px)] items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <div className='grid min-h-[calc(100vh-100px)] grid-cols-12 justify-center'>
          <AssistantContext.Provider
            value={{ assistant, setAssistant: changeAssistant }}
          >
            <div
              className={
                'm-2 items-center justify-center xs:col-span-12 sm:col-span-4 md:col-span-4 xl:col-span-3'
              }
            >
              <SideNavigation />
            </div>
            <div
              className={
                'm-4 items-center justify-center xs:col-span-12 sm:col-span-8 md:col-span-8 xl:col-span-9'
              }
            >
              {children}
            </div>
          </AssistantContext.Provider>
        </div>
      )}
    </div>
  );
}
