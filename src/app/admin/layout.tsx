import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/Header';
import { PageFooter } from '@/components/Footer';
import { redirect } from 'next/navigation';
import AdminSideNavigationContainer from '@/app/admin/AdminSideNavigationContainer';
import { getSession } from '@auth0/nextjs-auth0';
import AccessDenied from '@/components/AccessDenied';
import { isAdminUser } from '@/utils/user';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect('/api/auth/login?returnTo=/admin/dashboard');
  const { user } = session;

  return isAdminUser(user) ? (
    <div className='p min-h-[calc(100vh-100px)] justify-center'>
      <div className={'bg-gray-50 dark:bg-gray-900'}>
        <Toaster position='top-center' />
        <Header />
        <AdminSideNavigationContainer />
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
    <AccessDenied />
  );
}
