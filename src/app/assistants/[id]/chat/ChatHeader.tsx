import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import { getStyleHash } from '@/app/utils/hash';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';

export interface ChatHeaderProps extends ChatProps {
  fullScreen: boolean;
  setFullScreen: (fullScreen: boolean) => void;
}

export default function ChatHeader(props: ChatHeaderProps) {
  return (
    <>
      <div
        className={
          'bg-red z-10 ml-4 flex flex-col ' +
          getStyleHash(props.assistant.id).primaryText
        }
      >
        <div className='grid min-w-max grid-cols-2'>
          <div className='col-span-1 text-2xl'>{props.assistant.name}</div>
          <div className='col-span-1'>
            {!props.fullScreen ? (
              <HiChevronUp
                size={'30'}
                className='float-right cursor-pointer justify-end'
                onClick={() => {
                  props.setFullScreen(true);
                }}
              />
            ) : (
              <HiChevronDown
                size={'30'}
                className='float-right cursor-pointer justify-end'
                onClick={() => {
                  props.setFullScreen(false);
                }}
              />
            )}
          </div>
        </div>
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
