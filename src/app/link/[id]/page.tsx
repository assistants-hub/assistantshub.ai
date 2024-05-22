'use client';

import { useParams } from 'next/navigation';
import ChatWindow from '@/app/assistants/[id]/chat/ChatWindow';
import ChatPage from '@/app/assistants/[id]/chat/ChatPage';
import ChatPageContextWrapper from '@/app/assistants/[id]/chat/ChatPageContextWrapper';

export interface ChatComponentProps {
  params: { id: string };
}

const LinkComponent: React.FC<ChatComponentProps> = ({ params }) => {
  return <ChatPageContextWrapper assistantId={params.id} />;
};

export default function Link() {
  const params = useParams<{ id: string }>();

  /* http://localhost:3001/link/asst_GDAqYSylPoffSzu9eZygXU7l */
  return <LinkComponent params={params} />;
}
