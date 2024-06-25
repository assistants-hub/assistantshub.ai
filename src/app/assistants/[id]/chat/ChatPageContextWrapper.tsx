import { useGetAssistant } from '@/app/assistants/[id]/client';
import React, { useEffect, useState } from 'react';
import { Assistant } from '@/app/types/assistant';
import ChatPage from '@/app/assistants/[id]/chat/ChatPage';
import { Spinner } from 'flowbite-react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import { useRouter } from 'next/navigation';

export default function ChatPageContextWrapper(props: { assistantId: string }) {
  let { assistantLoading, assistantResponse, assistantEmpty, reload } =
    useGetAssistant(props.assistantId);

  const [loading, setLoading] = useState(true);
  const [assistant, setAssistant] = useState<Assistant>(assistantResponse);

  const { push } = useRouter();

  useEffect(() => {
    if (assistantResponse) {
      setAssistant(assistantResponse);
      // @ts-ignore
      if (assistantResponse && assistantResponse.message) {
        push('/api/auth/login?returnTo=/link/' + props.assistantId);
      }
      setLoading(false);
    }
  }, [assistantLoading]);

  const changeAssistant = async (assistant: Assistant) => {
    setAssistant(assistant);
    // We don't allow changes from the end-user so this is a no-op
  };

  return loading ? (
    <div className='bg-grey flex h-[calc(100vh-120px)] items-center justify-center '>
      <Spinner color='info' aria-label='Loading assistant..' />
    </div>
  ) : assistant.id ? (
    <AssistantContext.Provider
      value={{ assistant, setAssistant: changeAssistant }}
    >
      <ChatPage />
    </AssistantContext.Provider>
  ) : (
    <>Redirecting...</>
  );
}
