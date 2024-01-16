import useSWR from 'swr';
import { useMemo } from 'react';
import { Model } from '@/app/types/model';
import { Credential } from '@/app/types/credential';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useGetModels() {
  const { data, isLoading, error, isValidating } = useSWR(
    '/api/openai/models',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return useMemo(
    () => ({
      models: data?.data as Model[],
      modelsLoading: isLoading,
      modelsError: error,
      modelsValidating: isValidating,
      modelsEmpty: !isLoading && !data?.models?.length,
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

  return response.json();
}
