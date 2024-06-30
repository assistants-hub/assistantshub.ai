'use client';

import React, { useEffect, useState } from 'react';
import { updateAssistant, useGetAssistant } from '@/app/assistants/[id]/client';
import { Button, Spinner } from 'flowbite-react';
import SideNavigation from '@/app/assistants/[id]/SideNavigation';
import { Assistant } from '@/app/types/assistant';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useUser } from '@auth0/nextjs-auth0/client';
import { redirect } from 'next/navigation';

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
  const [sideBarCss, setSideBarCss] = useState(
    'fixed left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0'
  );
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (assistantResponse) {
      setAssistant(assistantResponse);
      setLoading(false);
    }
  }, [assistantResponse]);

  useEffect(() => {
    if (!isLoading && !user) {
      redirect('/');
    }
  }, [isLoading]);

  useEffect(() => {}, [sideBarCss]);

  const changeAssistant = async (assistant: Assistant) => {
    setAssistant(assistant);
    await updateAssistant(assistant);
  };

  const handleToggleSideBar = () => {
    if (sideBarCss.includes('sm:translate-x-0')) {
      setSideBarCss(
        'float left-0 z-40 w-64 transition-transform sm:translate-x-full'
      );
    } else {
      setSideBarCss(
        'fixed left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0'
      );
    }
  };

  return (
    <div className='p10'>
      {loading ? (
        <div className='bg-grey flex min-h-[calc(100vh-100px)] items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <div className='min-h-[calc(100vh-100px)] justify-center'>
          <AssistantContext.Provider
            value={{ assistant, setAssistant: changeAssistant }}
          >
            <Button
              pill
              color={'light'}
              onClick={handleToggleSideBar}
              className='m-2 border-0 bg-gray-50 sm:hidden'
            >
              <HiMenuAlt2 className='h-5 w-5' />
            </Button>
            <aside
              id='logo-sidebar'
              className={sideBarCss}
              aria-label='Sidebar'
            >
              <SideNavigation />
            </aside>
            <div className={'m-4 items-center justify-center sm:ml-64'}>
              {children}
            </div>
          </AssistantContext.Provider>
        </div>
      )}
    </div>
  );
}
