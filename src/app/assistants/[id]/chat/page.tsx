import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import ChatAgent from '@/app/assistants/[id]/chat/ChatAgent';

export default function Chat(props:ChatProps) {
  return <ChatAgent assistant={props.assistant}/>
}