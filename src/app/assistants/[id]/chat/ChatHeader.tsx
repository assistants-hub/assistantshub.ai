import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import { getStyleHash } from '@/app/utils/hash';
import { HiMinus, HiX } from 'react-icons/hi';
import { useContext } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';

export interface ChatHeaderProps extends ChatProps {
  minimize: boolean;
  setMinimize: (minimize: boolean) => void;
  close: () => void;
}

export default function ChatHeader(props: ChatHeaderProps) {
  const { assistant } = useContext(AssistantContext);

  return (
    <>
      <div
        className={
          'z-10 ml-2 flex flex-col ' + getStyleHash(assistant.id).primaryText
        }
      >
        <div className='grid grid-cols-2'>
          <div className='col-span-1'>
            <p className='max-w-[200px] text-xl leading-relaxed'>
              {assistant.name}
            </p>
          </div>
          <div className='col-span-1'>
            {!props.minimize ? (
              <div>
                <HiX
                  size={'20'}
                  className='float-right cursor-pointer justify-end'
                  onClick={() => props.close()}
                />
                &nbsp;
                <HiMinus
                  size={'20'}
                  className='float-right cursor-pointer justify-end'
                  onClick={() => {
                    props.setMinimize(true);
                  }}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className={'w-60 text-xs ' + getStyleHash(assistant.id).secondaryText}
        >
          {assistant.description}
        </div>
      </div>
    </>
  );
}
