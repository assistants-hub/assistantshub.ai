import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import { HiMinus, HiX } from 'react-icons/hi';
import { useContext, useEffect } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import {
  getPrimaryTextColor,
  getSecondaryTextColor,
} from '@/app/utils/assistant';

export interface ChatHeaderProps extends ChatProps {
  minimize: boolean;
  setMinimize: ((minimize: boolean) => void) | null;
  close: () => void;
}

export default function ChatHeader(props: ChatHeaderProps) {
  const { assistant } = useContext(AssistantContext);

  useEffect(() => {}, [assistant]);

  return (
    <>
      <div
        className={
          'z-10 ml-2 flex max-w-md flex-col ' +
          `text-[${getPrimaryTextColor(assistant)}]`
        }
      >
        <div className='grid grid-cols-5'>
          <div className='col-span-4'>
            <p className='max-w-md text-xl leading-relaxed'>{assistant.name}</p>
          </div>
          <div className='col-span-1'>
            {!props.minimize && props.setMinimize ? (
              <div>
                {/*<HiX
                  size={'20'}
                  className='float-right cursor-pointer justify-end'
                  onClick={() => props.close()}
                />*/}
                &nbsp;
                <HiMinus
                  size={'20'}
                  className='float-right cursor-pointer justify-end'
                  onClick={() => {
                    props.setMinimize ? props.setMinimize(true) : null;
                  }}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className={
            'w-60 text-xs ' + `text-[${getSecondaryTextColor(assistant)}]`
          }
        >
          {assistant.description}
        </div>
      </div>
    </>
  );
}
