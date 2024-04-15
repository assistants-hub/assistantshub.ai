export interface Tool {
  type: string;
}

export interface AssistantTheme {
  primaryColor?: string;
  secondaryColor?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  initialPrompt?: string;
  messageLabel?: string;
}

export interface Assistant {
  id?: string;
  created_at?: number;
  name: string;
  instructions?: string;
  description?: string;
  tools?: Tool[];
  model: string;
  file_ids?: string[];
  metadata?: Record<string, string>;
  avatar?: string | null;
  profile?: string | null;
  theme?: AssistantTheme | null;
}
