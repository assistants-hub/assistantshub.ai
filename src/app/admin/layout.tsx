'use client';

import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/header';
import { Alert, Button, Sidebar, Spinner } from 'flowbite-react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiInformationCircle,
  HiMenuAlt2,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi';
import { PageFooter } from '@/components/footer';
import AdminSideNavigation from '@/app/admin/AdminSideNavigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import Unauthenticated from '@/components/unauthenticated';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // @ts-ignore
  const { user, error, isLoading } = useUser();

  const [sideBarCss, setSideBarCss] = useState(
    'fixed left-0 w-64 transition-transform -translate-x-full sm:translate-x-0 bg-red-50'
  );

  useEffect(() => {}, [sideBarCss]);

  const { push } = useRouter();

  useEffect(() => {
    console.log(user);
    if (!isLoading && !user) {
      push('/api/auth/login?returnTo=/admin/dashboard');
    }
  }, [isLoading]);

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

  if (isLoading)
    return (
      <div className='bg-grey flex min-h-[calc(100vh-100px)] items-center justify-center'>
        <Spinner />
      </div>
    );

  if (!user) return <Unauthenticated />;

  const isUserAuthorized = function () {
    console.log(process.env.NEXT_PUBLIC_ADMIN_USERS);
    if (process.env.NEXT_PUBLIC_ADMIN_USERS) {
      const allowedAdmins = JSON.parse(process.env.NEXT_PUBLIC_ADMIN_USERS);

      console.log(allowedAdmins);

      return user && allowedAdmins.includes(user.sub);
    } else {
      return false;
    }
  };

  return isUserAuthorized() ? (
    <div className='p min-h-[calc(100vh-100px)] justify-center'>
      <div className={'bg-gray-50 dark:bg-gray-900'}>
        <Header />
        <Toaster position='top-center' />
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
        <div
          className={
            'm-4 min-h-[calc(100vh-100px)] items-center justify-center sm:ml-64'
          }
        >
          {children}
        </div>
        <PageFooter />
      </div>
    </div>
  ) : (
    <>Access Denied.</>
  );
}
