import { Alert } from 'flowbite-react';
import React from 'react';
import { Header } from '@/components/Header';
import { PageFooter } from '@/components/Footer';
import { HiLogin } from 'react-icons/hi';

export default function Unauthenticated() {
  return (
    <>
      <Header />
      <div className='bg-grey flex min-h-[calc(100vh-100px)] items-center justify-center'>
        <Alert color='info' icon={HiLogin}>
          <span className='font-medium'>Redirecting...</span>
        </Alert>
      </div>
      <PageFooter />
    </>
  );
}
