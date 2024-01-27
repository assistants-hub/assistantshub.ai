'use client';

import { useParams } from 'next/navigation';
import { useGetAssistant } from '@/app/assistants/[id]/client';
import Chat from '@/app/assistants/[id]/chat/page';

export default function Customize() {
  const params = useParams<{ id: string }>();
  let { assistantLoading, assistant, assistantEmpty, reload } = useGetAssistant(
    params.id
  );

  return <Chat assistant={assistant} />;
}
