import { useContext, useEffect } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import ChatWindow from '@/app/assistants/[id]/chat/ChatWindow';
import ChatPopup from '@/app/assistants/[id]/chat/ChatPopup';

export default function ChatPopupContextWrapper() {
  const { assistant } = useContext(AssistantContext);

  useEffect(() => {}, [assistant]);

  return assistant ? (
    <ChatPopup hide={false} setHide={null}/>
  ) : (
    <></>
  );
}
