import { Button, Label, Modal, TextInput } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { getInitialConversationStarter } from '@/app/utils/assistant';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import { ulid } from 'ulidx';
import { HiCheck, HiPlus, HiTrash } from 'react-icons/hi';
import DebouncedInputWithActions from '@/app/assistants/[id]/customize/DebounceInputWithActions';
import { ConversationStarter } from '@/app/types/assistant';

export const EditConversationStarters: React.FC = () => {
  const { assistant, setAssistant } = useContext(AssistantContext);

  const [conversationStarters, setConversationStarters] = useState<
    ConversationStarter[]
  >(getInitialConversationStarter(assistant));
  const [saveConversationStarter, setSaveConversationStarter] =
    useState<ConversationStarter | null>(null);
  const [dirtyConversationStarter, setdirtyConversationStarter] =
    useState<ConversationStarter | null>(null);
  const [selectedConversationStarter, setSelectedConversationStarter] =
    useState<ConversationStarter | null>(null);
  const [deleteConversationStarter, setDeleteConversationStarter] =
    useState<ConversationStarter | null>(null);

  useEffect(() => {
    // Save it to the assistant
    setAssistant({
      ...assistant,
      theme: {
        ...assistant.theme,
        conversationStarters: conversationStarters,
      },
    });
  }, [conversationStarters]);

  useEffect(() => {}, [dirtyConversationStarter]);

  useEffect(() => {}, [saveConversationStarter]);

  useEffect(() => {
    if (deleteConversationStarter) {
      const indexToRemove = conversationStarters.findIndex(
        (key) => key.id === deleteConversationStarter.id
      );
      if (indexToRemove !== -1) {
        conversationStarters.splice(indexToRemove, 1);
      }
      setConversationStarters([...conversationStarters]);
      setDeleteConversationStarter(null);
    }
  }, [deleteConversationStarter]);

  const handleAddConversationStarter = function () {
    setConversationStarters([
      ...conversationStarters,
      { id: ulid(), prompt: '' },
    ]);
  };

  const handleSaveConversationStarter = function (id: string, text: string) {
    conversationStarters.forEach((starter) => {
      if (starter.id === id) {
        starter.prompt = text;
      }
    });

    setConversationStarters([...conversationStarters]);
  };

  const handleDeleteConversationStarter = function (id: string) {
    conversationStarters.forEach((iterationConversationStarter) => {
      if (iterationConversationStarter.id === id) {
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
                  onDebounceTextChange={(text) =>
                    handleSaveConversationStarter(starter.id, text)
                  }
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
