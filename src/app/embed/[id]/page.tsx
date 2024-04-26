'use client';

import { useParams, useSearchParams } from 'next/navigation';
import ChatAgent from '@/app/assistants/[id]/chat/ChatAgent';
import ChatWindow from '@/app/assistants/[id]/chat/ChatWindow';

export default function Chat() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  let style = searchParams.get('style');
  console.log(style);

  /*
  <iframe src="http://localhost:3001/embed/asst_GDAqYSylPoffSzu9eZygXU7l"
        style="right: 0; position: fixed; overflow: hidden; height: 100vh; border: 0 none; width: 480px; bottom: -30px;"
        allowfullscreen allowtransparency></iframe>
   */
  return style && style === 'window' ? (
    <ChatWindow assistant_id={params.id} />
  ) : (
    <ChatAgent assistant_id={params.id} />
  );
}
