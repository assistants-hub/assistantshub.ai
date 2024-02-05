'use client';

import React from 'react';
import { useGetAssistant } from '@/app/assistants/[id]/client';

export default function ChatLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  let { assistantLoading, assistant, assistantEmpty, reload } = useGetAssistant(
    params.id
  );

  return (
    <div className='p10'>
      {children}
    </div>
  );
}
