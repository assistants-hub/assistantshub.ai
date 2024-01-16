export interface Tool {
  type: string;
}

export interface Assistant {
  name: string;
  instructions?: string;
  description?: string;
  tools?: Tool[];
  model: string;
  file_ids?: string[];
  metadata?: Record<string, string>;
}
