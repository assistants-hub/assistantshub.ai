import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/Header';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={'bg-gray-50 dark:bg-gray-900'}>
      <Toaster position='top-center' />
      <Header />
      {children}
    </div>
  );
}
