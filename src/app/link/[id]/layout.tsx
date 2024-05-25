'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function LinkLayout({
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
