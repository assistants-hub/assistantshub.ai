export interface Tool {
  type: string;
}

export interface ConversationStarter {
  id: string;
  prompt: string;
}

export interface AssistantTheme {
  primaryColor?: string;
  secondaryColor?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  initialPrompt?: string;
  messageLabel?: string;
  conversationStarters?: ConversationStarter[];
}

export interface Assistant {
  id?: string;
  created_at?: number;
  name: string;
  instructions?: string;
  description?: string;
  tools?: Tool[];
  modelId?: string;
  modelProviderId?: string;
  modelProviderKeyId?: string;
  modelProviderKey?: {
    id: string;
    name: string;
  };
  file_ids?: string[];
  metadata?: Record<string, string>;
  avatar?: string | null;
  profile?: string | null;
  theme?: AssistantTheme | null;
  published?: boolean;
  authenticatedUsersOnly?: boolean;
}
