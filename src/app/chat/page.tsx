'use client';

import React, { useState } from 'react';
import { SidebarNavigation } from '@/components/SidebarNavigation';
import { HiMenuAlt2 } from 'react-icons/hi';

export default function ChatPage() {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <>
      <SidebarNavigation open={openSidebar} />
      <div className={openSidebar ? 'h-dvh pt-8 sm:ml-64' : 'h-dvh pt-8'}>
        <div className='mt-11 h-10 items-start justify-start bg-gray-100'>
          <div className={'grid grid-flow-row p-1'}>
            <HiMenuAlt2 className='m-2 h-7 w-7 text-gray-500' onClick={() => setOpenSidebar(!openSidebar)} />
          </div>
          <div className='h-screen rounded-lg border-gray-200 bg-green-100 p-4 dark:border-gray-700'></div>
        </div>
      </div>
    </>
  );
}
