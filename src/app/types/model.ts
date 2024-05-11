export interface ModelProvider {
  id: string;
  name: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  url: string;
  provider: ModelProvider;
  features?: {
    retrieval: boolean;
  };
}
