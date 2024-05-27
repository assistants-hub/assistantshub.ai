'use client';

import { Button, Modal } from 'flowbite-react';
import Workflow from '@/app/onboarding/Workflow';

export default function Onboarding() {
  return (
    <div
      className={
        'flex h-screen w-screen flex-auto items-center justify-center bg-gray-50 dark:bg-gray-900'
      }
    >
      <Workflow />
    </div>
  );
}
