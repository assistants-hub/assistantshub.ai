export interface ModelProvider {
  id: string;
  name: string;
}

export interface ModelProviderKey {
  id: string;
  name?: string;
  key?: string;
  modelProviderId?: string;
  saving?: boolean;
  dirty?: boolean;
  deleting?: boolean;
  disabled?: boolean;
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
  keys: ModelProviderKey[];
}
