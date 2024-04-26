import { useContext, useEffect } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import ChatWindow from '@/app/assistants/[id]/chat/ChatWindow';

export default function ChatWindowContextWrapper() {
  const { assistant } = useContext(AssistantContext);

  useEffect(() => {}, [assistant]);

  return assistant ? (
    <ChatWindow assistant_id={assistant.id as string} />
  ) : (
    <></>
  );
}
