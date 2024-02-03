'use client';

import { useParams } from 'next/navigation';
import { useGetAssistant } from '@/app/assistants/[id]/client';
import ChatAgent from '@/app/assistants/[id]/chat/ChatAgent';

export default function Customize() {
  const params = useParams<{ id: string }>();
  let { assistantLoading, assistant, assistantEmpty, reload } = useGetAssistant(
    params.id
  );

  return assistant.id ? <ChatAgent assistant_id={assistant.id} /> : <></>;
}
