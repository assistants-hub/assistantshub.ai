export interface Text {
  value: string;
  annotations: [];
}

export interface Content {
  type: string;
  text?: Text;
}

export interface Message {
  id?: string;
  created_at?: number;
  role: 'user' | 'assistant';
  content: Content[];
}
