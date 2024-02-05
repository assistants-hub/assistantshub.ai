'use client';

import { useParams } from 'next/navigation';
import ChatAgent from '@/app/assistants/[id]/chat/ChatAgent';

export default function Chat() {
  const params = useParams<{ id: string }>();

  /*
  <iframe src="http://localhost:3001/embed/asst_GDAqYSylPoffSzu9eZygXU7l"
        style="right: 0; position: fixed; overflow: hidden; height: 100vh; border: 0 none; width: 480px; bottom: -30px;"
        allowfullscreen allowtransparency></iframe>
   */
  return <ChatAgent assistant_id={params.id} />;
}
