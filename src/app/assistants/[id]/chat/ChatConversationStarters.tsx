import { useContext } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import { Button } from 'flowbite-react';

export interface ChatConversationStartersProps {
  onClick?: (text:string)=> void
}

export default function ChatConversationStarters(props: ChatConversationStartersProps) {
  const { assistant } = useContext(AssistantContext);

  return (
    <div className={'grid grid-flow-row-dense xs:grid-cols-1 sm:grid-cols-2 gap-4 pt-5 items-center justify-center'}>
      {
        assistant && assistant.theme && assistant.theme.conversationStarters ?
          assistant.theme.conversationStarters.map(
            (conversationStarter) => {
              return (
              <Button color="light"
                      size={'md'}
                      key={conversationStarter.id}
                      className={'p-2 bg-gray-100 text-gray-500'}
                      onClick={(e) => {
                        props.onClick ? props.onClick(conversationStarter.prompt) : undefined
                        e.stopPropagation();
                      }}>
                {conversationStarter.prompt}
              </Button>
              );
            }
          ) :<></>
      }
    </div>
  );
}