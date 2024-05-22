'use client';

import { useParams } from 'next/navigation';
import ChatWindow from '@/app/assistants/[id]/chat/ChatWindow';

export interface ChatComponentProps {
  params: { id: string };
}

const LinkComponent: React.FC<ChatComponentProps> = ({ params }) => {
  return <ChatWindow assistant_id={params.id} frameless={true} />;
};

export default function Link() {
  const params = useParams<{ id: string }>();

  /* http://localhost:3001/link/asst_GDAqYSylPoffSzu9eZygXU7l */
  return <LinkComponent params={params} />;
}
