import React from 'react';
import { Header } from '@/components/Header';
import { Toaster } from 'react-hot-toast';
import { PageFooter } from '@/components/Footer';

export default function AdminLayout({
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
