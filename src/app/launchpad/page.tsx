'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import GetStarted from '@/app/launchpad/GetStarted';

export default function Page() {
  return (
    <SessionProvider>
      <GetStarted />
    </SessionProvider>
  );
}
