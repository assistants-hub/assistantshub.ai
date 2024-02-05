'use client';

import { useParams } from 'next/navigation';
import ChatAgent from '@/app/assistants/[id]/chat/ChatAgent';

export default function Chat() {
  const params = useParams<{ id: string }>();

  return  <ChatAgent assistant_id={params.id} />;
}
