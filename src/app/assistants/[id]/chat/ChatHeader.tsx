import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import { getStyleHash } from '@/app/utils/hash';

export default function ChatHeader(props: ChatProps) {
  return (
    <>
      <div
        className={
          'z-10 ml-4 flex flex-col ' +
          getStyleHash(props.assistant.id).primaryText
        }
      >
        <div className='text-2xl'>{props.assistant.name}</div>
        <div
          className={
            'text-md w-60 ' + getStyleHash(props.assistant.id).secondaryText
          }
        >
          {props.assistant.description}
        </div>
      </div>
    </>
  );
}
