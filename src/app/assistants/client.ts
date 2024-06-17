import useSWR from 'swr';
import { useMemo } from 'react';
import { Model, ModelProvider } from '@/app/types/model';
import { Assistant } from '@/app/types/assistant';
import { fetcher } from '@/app/utils/fetcher';

export function useGetModels() {
  const { data, isLoading, error, isValidating } = useSWR(
    '/api/models',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return useMemo(
    () => ({
      models: data as { models: Model[]; providers: ModelProvider[] },
      modelsLoading: isLoading,
      modelsError: error,
      modelsValidating: isValidating,
      modelsEmpty: !isLoading,
    }),
    [data, error, isLoading, isValidating]
  );
}

export async function createAssistant(assistant: Assistant) {
  let response = await fetch('/api/assistants', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      modelProviderKeyId: assistant.modelProviderKeyId,
      modelProviderId: assistant.modelProviderId,
      modelId: assistant.modelId,
      name: assistant.name,
      description: assistant.description,
      instructions: assistant.instructions,
    }),
  });

  return [response.status, await response.json()];
}

export function useGetAssistants() {
  let { data, isLoading, error, isValidating, mutate } = useSWR(
    '/api/assistants',
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return useMemo(
    () => ({
      assistants: data as Assistant[],
      assistantsLoading: isLoading,
      assistantsError: error,
      assistantsValidating: isValidating,
      assistantsEmpty: !isLoading && !data?.length,
      mutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}
