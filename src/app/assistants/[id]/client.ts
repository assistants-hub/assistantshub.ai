import useSWR from 'swr';
import { useMemo } from 'react';
import { Assistant } from '@/app/types/assistant';
import { fetcher } from '@/app/utils/fetcher';

export function useGetAssistant(id: string) {
  let key = '/api/openai/assistants/' + id;

  let { data, isLoading, error, isValidating, mutate } = useSWR(key, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return useMemo(
    () => ({
      assistant: data as Assistant,
      assistantLoading: isLoading,
      assistantError: error,
      assistantValidating: isValidating,
      assistantEmpty: !isLoading && !data,
      reload: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}
