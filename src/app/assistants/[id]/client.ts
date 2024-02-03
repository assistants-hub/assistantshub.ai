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

export async function createAndRunThread(
  id: string | undefined,
  messages: Message[]
) {
  if (!id) {
    return [400, { error: 'Assistant ID is required' }];
  }

  let response = await fetch('/api/openai/threads/runs', {
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

export async function getRun(
  assistantId: string | undefined,
  threadId: string | undefined,
  id: string | undefined
) {
  if (!id) {
    return [400, { error: 'Run ID is required' }];
  }

  let response = await fetch('/api/openai/threads/runs/' + id, {
    method: 'GET',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json',
      'X-Assistant-Id': assistantId || '',
      'X-Thread-Id': threadId || '',
    },
  });

  return [response.status, await response.json()];
}

export async function getMessages(
  assistantId: string | undefined,
  threadId: string | undefined
) {
  if (!threadId) {
    return [400, { error: 'Thread ID is required' }];
  }

  let response = await fetch('/api/openai/threads/' + threadId + '/messages', {
    method: 'GET',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json',
      'X-Assistant-Id': assistantId || '',
    },
  });

  return [response.status, await response.json()];
}
