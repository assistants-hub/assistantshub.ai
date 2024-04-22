import useSWR from 'swr';
import { useMemo } from 'react';
import { Model, ModelProvider } from '@/app/types/model';
import { Credential } from '@/app/types/credential';
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

export function useGetCredentials() {
  const { data, isLoading, error, isValidating } = useSWR(
    '/api/credentials',
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return useMemo(
    () => ({
      credentials: data as Credential[],
      credentialsLoading: isLoading,
      credentialsError: error,
      credentialsValidating: isValidating,
      credentialsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
}

export async function setCredentials(openAiApiKey: string) {
  let response = await fetch('/api/credentials', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ openAiApiKey: openAiApiKey }),
  });

  return [response.status, await response.json()];
}

export async function createAssistant(assistant: Assistant) {
  let response = await fetch('/api/openai/assistants', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: assistant.model,
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
      reload: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}
