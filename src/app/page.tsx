import React from 'react';
import { Header } from '@/components/header';
import { PageFooter } from '@/components/footer';
import Home from '@/components/home';
import 'highlight.js/styles/github.css';
import { redirect } from 'next/navigation';
import prisma from '@/app/api/utils/prisma';

export default async function Landing() {
  // Fetch data from the API endpoint
  const system = prisma.system.findFirst();

  // Check the status and redirect based on the response
  // @ts-ignore
  if (system.currentStep !== 1000) {
    redirect('/onboarding');
    return null;
  }

  return (
    <div className={'bg-gray-50 dark:bg-gray-900'}>
      <Header />
      <Home />
      <PageFooter />
    </div>
  );
}
