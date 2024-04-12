// AssistantContext.ts
import React, { Dispatch, SetStateAction } from 'react';
import { Assistant } from '@/app/types/assistant';

interface AssistantContextType {
  assistant: Assistant;
  setAssistant: Dispatch<SetStateAction<Assistant>>;
}

const AssistantContext = React.createContext<AssistantContextType>({
  assistant: {} as Assistant,
  setAssistant: () => {}, // Provide a default empty function
});

export default AssistantContext;
