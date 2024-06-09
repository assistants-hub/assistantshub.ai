import React from 'react';
import { Header } from '@/components/header';
import { Toaster } from 'react-hot-toast';
import { PageFooter } from '@/components/footer';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={'bg-gray-50 dark:bg-gray-900'}>
      <Header />
      <Toaster position='top-center' />
      {children}
      <PageFooter />
    </div>
  );
}
