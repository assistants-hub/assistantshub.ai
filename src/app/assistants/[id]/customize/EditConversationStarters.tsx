import { Button, Label, Modal, TextInput } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import DebouncedInput from '@/app/assistants/[id]/customize/DebounceInput';
import { getInitialConversationStarter } from '@/app/utils/assistant';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import { ulid } from 'ulidx';
import { HiCheck, HiPlus, HiTrash } from 'react-icons/hi';
import DebouncedInputWithActions from '@/app/assistants/[id]/customize/DebounceInputWithActions';

export interface ConversationStarter {
  id: string;
  prompt: string;
}

export const EditConversationStarters: React.FC = () => {
  const { assistant, setAssistant } = useContext(AssistantContext);

  const [conversationStarters, setConversationStarters] = useState<
    ConversationStarter[]
  >([]);
  const [saveConversationStarter, setSaveConversationStarter] =
    useState<ConversationStarter | null>(null);
  const [dirtyConversationStarter, setdirtyConversationStarter] =
    useState<ConversationStarter | null>(null);
  const [selectedConversationStarter, setSelectedConversationStarter] =
    useState<ConversationStarter | null>(null);
  const [deleteConversationStarter, setDeleteConversationStarter] =
    useState<ConversationStarter | null>(null);

  useEffect(() => {
    console.log('changed');
    console.log(conversationStarters);
  }, [conversationStarters]);

  useEffect(() => {}, [dirtyConversationStarter]);

  useEffect(() => {}, [saveConversationStarter]);

  useEffect(() => {
    if (deleteConversationStarter) {
      // TODO: Remove through API
      const indexToRemove = conversationStarters.findIndex(
        (key) => key.id === deleteConversationStarter.id
      );
      if (indexToRemove !== -1) {
        conversationStarters.splice(indexToRemove, 1);
      }
      setConversationStarters(conversationStarters);
      setDeleteConversationStarter(null);
    }
  }, [deleteConversationStarter]);

  const handleAddConversationStarter = function () {
    setConversationStarters([
      ...conversationStarters,
      { id: ulid(), prompt: '' },
    ]);
  };

  const handleSaveConversationStarter = function () {};

  const onConversationStarterChange = function (event: any) {
    conversationStarters.forEach((iterationConversationStarter) => {});
  };

  const handleDeleteConversationStarter = function (id: string) {
    conversationStarters.forEach((iterationConversationStarter) => {
      if (iterationConversationStarter.id === id) {
        console.log(iterationConversationStarter);
        setDeleteConversationStarter(iterationConversationStarter);
      }
    });
  };

  return (
    <div className={'stack space-y-1'}>
      <div id='conversationStarters' className='grid max-w-4xl'>
        <div className='mb-2 block'>
          <Label value='Conversation Starters for Assistant' />
        </div>
        {conversationStarters && conversationStarters.length ? (
          conversationStarters.map((starter: any, index: number) => (
            <div key={index} className={'overflow-y-auto'}>
              <div className='gap-2 pt-5'>
                <DebouncedInputWithActions
                  onDebounceTextChange={onConversationStarterChange as any}
                  onDebounceTextDelete={() => {
                    handleDeleteConversationStarter(starter.id);
                  }}
                  value={starter.prompt}
                />
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
        <div className='flex justify-center pt-4'>
          <Button
            size={'md'}
            color={'gray'}
            onClick={handleAddConversationStarter}
          >
            <HiPlus className='mr-2 h-5 w-5' />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
