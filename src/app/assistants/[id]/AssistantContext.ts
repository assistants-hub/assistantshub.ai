// AssistantContext.ts
import React, { Dispatch, SetStateAction } from 'react';
import { Assistant } from '@/app/types/assistant';

interface AssistantContextType {
  assistant: Assistant;
  setAssistant: (assistant: Assistant) => Promise<void>; // Adjust this to match the actual function signature
}

// Provide an initial dummy function and default assistant value to satisfy TypeScript
const defaultAssistant: Assistant = {} as Assistant;
const defaultSetAssistant = async (assistant: Assistant) => {};

export const AssistantContext = React.createContext<AssistantContextType>({
  assistant: defaultAssistant,
  setAssistant: defaultSetAssistant,
});
export default AssistantContext;
