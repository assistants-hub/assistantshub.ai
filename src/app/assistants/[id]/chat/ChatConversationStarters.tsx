import { useContext } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import { Button } from 'flowbite-react';

export interface ChatConversationStartersProps {
  onClick?: (text: string) => void;
}

export default function ChatConversationStarters(
  props: ChatConversationStartersProps
) {
  const { assistant } = useContext(AssistantContext);

  return (
    <div
      className={
        'grid grid-flow-row-dense items-center justify-center gap-4 pt-5 xs:grid-cols-1 sm:grid-cols-2'
      }
    >
      {assistant && assistant.theme && assistant.theme.conversationStarters ? (
        assistant.theme.conversationStarters.map((conversationStarter) => {
          return (
            <Button
              color='light'
              size={'md'}
              key={conversationStarter.id}
              className={'bg-gray-100 p-2 text-gray-500'}
              onClick={(e:any) => {
                props.onClick
                  ? props.onClick(conversationStarter.prompt)
                  : undefined;
                e.stopPropagation();
              }}
            >
              {conversationStarter.prompt}
            </Button>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
