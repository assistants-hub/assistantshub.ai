import { useContext, useEffect } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import ChatAgent from '@/app/assistants/[id]/chat/ChatAgent';

export default function ChatAgentContextWrapper() {
  const { assistant } = useContext(AssistantContext);

  useEffect(() => {}, [assistant]);

  return assistant ? (
    <ChatAgent assistant_id={assistant.id as string} />
  ) : (
    <></>
  );
}
