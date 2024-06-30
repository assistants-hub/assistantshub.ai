'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { HiMenuAlt2 } from 'react-icons/hi';
import AdminSideNavigation from '@/app/admin/AdminSideNavigation';

export default function AdminSideNavigationContainer() {
  const [sideBarCss, setSideBarCss] = useState(
    'fixed left-0 w-64 transition-transform -translate-x-full sm:translate-x-0 bg-red-50'
  );

  useEffect(() => {}, [sideBarCss]);

  const handleToggleSideBar = () => {
    if (sideBarCss.includes('sm:translate-x-0')) {
      setSideBarCss(
        'float left-0 w-64 transition-transform sm:translate-x-full  bg-red-50'
      );
    } else {
      setSideBarCss(
        'fixed left-0 w-64 transition-transform -translate-x-full sm:translate-x-0  bg-red-50'
      );
    }
  };

  return (
    <>
      <Button
        pill
        color={'light'}
        onClick={handleToggleSideBar}
        className='m-2 border-0 bg-gray-50 sm:hidden'
      >
        <HiMenuAlt2 className='h-5 w-5' />
      </Button>
      <aside id='logo-sidebar' className={sideBarCss} aria-label='Sidebar'>
        <AdminSideNavigation />
      </aside>
    </>
  );
}
