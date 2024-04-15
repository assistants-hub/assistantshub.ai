import { Label } from 'flowbite-react';
import React, { useContext } from 'react';
import DebouncedInput from '@/app/assistants/[id]/customize/DebounceInput';
import { getInitialPrompt } from '@/app/utils/assistant';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';

export const EditInitialPrompt: React.FC = () => {
  const { assistant, setAssistant } = useContext(AssistantContext);

  function onDebounceTextChange(text: string) {
    // @ts-ignore
    setAssistant({
      ...assistant,
      theme: {
        ...assistant.theme,
        initialPrompt: text,
      },
    });
  }

  return (
    <div className='space-y-6 p-6'>
      <div id='fileUpload' className='grid max-w-4xl'>
        <div>
          <div className='mb-2 block'>
            <Label value='Initial Prompt from Assistant' />
          </div>
          <div className='grid max-w-4xl'>
            { /* @ts-ignore */ }
            <DebouncedInput value={getInitialPrompt(assistant)} onDebounceTextChange={onDebounceTextChange} />
          </div>
        </div>
      </div>
    </div>
  );
};
