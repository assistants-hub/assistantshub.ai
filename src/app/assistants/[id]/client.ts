import useSWR from 'swr';
import { useMemo } from 'react';
import { Assistant } from '@/app/types/assistant';
import { fetcher } from '@/app/utils/fetcher';
import { Message } from '@/app/types/message';

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

export async function deleteAssistant(id: string) {
  let response = await fetch('/api/openai/assistants/' + id, {
    method: 'DELETE',
  });

  return [response.status, await response.json()];
}

export async function createAndRunThread(id: string, messages: Message[]) {
  let response = await fetch('/api/openai/assistants/' + id + '/threads', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      assistant_id: id,
      thread: {
        messages: messages,
      },
    }),
  });

  return [response.status, await response.json()];
}
