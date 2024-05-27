'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Toaster position='top-center' />
      {children}
    </div>
  );
}
