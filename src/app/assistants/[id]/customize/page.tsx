'use client';

import { useParams } from 'next/navigation';
import { useGetAssistant } from '@/app/assistants/[id]/client';
import ChatAgent from '@/app/assistants/[id]/chat/ChatAgent';
import Markdown from 'marked-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useEffect } from 'react';

export default function Customize() {
  const params = useParams<{ id: string }>();
  let { assistantLoading, assistant, assistantEmpty, reload } = useGetAssistant(
    params.id
  );

  useEffect(() => {
    hljs.highlightAll();
  });

  return assistant.id ? (
    <div className='max-w-screen flex flex-col gap-4'>
      <ChatAgent assistant_id={assistant.id} />
      <h3 className='pb-4 text-3xl font-bold dark:text-white'>Customize</h3>
      <div className='max-w-screen items-center justify-center'>
        <p className='self-center pb-2 text-sm font-normal text-gray-500 dark:text-gray-400 lg:text-lg'>
          Please use the below embed code in integrate your assistant to any web
          page
        </p>
        <div className='max-w-screen overflow-hidden text-sm'>
          <Markdown>{`\`\`\`xml
<iframe 
  src="${window.location.origin}/embed/${assistant.id}"
  style="right: 0;
         position: fixed;
         overflow: hidden;
         height: 100vh;
         border: 0 none;
         width: 480px;
         bottom: -30px;"
  allowFullScreen 
  allowTransparency></iframe>`}</Markdown>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
