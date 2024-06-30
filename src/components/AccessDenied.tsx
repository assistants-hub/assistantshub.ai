import { Alert } from 'flowbite-react';
import React from 'react';
import { Header } from '@/components/Header';
import { PageFooter } from '@/components/Footer';
import { HiFingerPrint } from 'react-icons/hi';

export default function AccessDenied() {
  return (
    <>
      <Header />
      <div className='bg-grey flex min-h-[calc(100vh-100px)] items-center justify-center'>
        <Alert color='failure' icon={HiFingerPrint}>
          <span className='font-medium'>Access Denied.</span> You are not
          authorized to access this page.
        </Alert>
      </div>
      <PageFooter />
    </>
  );
}
