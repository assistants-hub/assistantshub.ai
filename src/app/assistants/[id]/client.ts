import useSWR from 'swr';
import { useMemo } from 'react';
import { Assistant } from '@/app/types/assistant';
import { Thread } from '@/app/types/thread';
import { fetcher } from '@/app/utils/fetcher';
import { Message } from '@/app/types/message';

export function useGetAssistant(id: string) {
  let key = '/api/assistants/' + id;

  let { data, isLoading, error, isValidating, mutate } = useSWR(key, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return useMemo(
    () => ({
      assistantResponse: data as Assistant,
      assistantLoading: isLoading,
      assistantError: error,
      assistantValidating: isValidating,
      assistantEmpty: !isLoading && !data,
      reload: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

export async function getModel(modelId: string) {
  if (!modelId) {
    return [400, { error: 'Model Id is required' }];
  }

  let response = await fetch('/api/models/' + modelId, {
    method: 'GET',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json',
    },
  });

  return [response.status, await response.json()];
}

export async function updateAssistant(assistant: Assistant) {
  let response = await fetch('/api/assistants/' + assistant.id, {
    method: 'PATCH',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: assistant.id,
      modelId: assistant.modelId,
      modelProviderId: assistant.modelProviderId,
      name: assistant.name,
      description: assistant.description,
      instructions: assistant.instructions,
      avatar: assistant.avatar,
      profile: assistant.profile,
      theme: assistant.theme,
    }),
  });

  return [response.status, await response.json()];
}

export async function deleteAssistant(id: string) {
  let response = await fetch('/api/assistants/' + id, {
    method: 'DELETE',
  });

  return [response.status, await response.json()];
}

export async function createThread(
  id: string | undefined,
  modelProviderId: string,
  fingerprint: string | undefined
) {
  if (!id) {
    return [400, { error: 'Assistant ID is required' }];
  }

  let response = await fetch('/api/' + modelProviderId + '/threads', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json',
      'X-Assistant-Id': id || '',
      'X-Fingerprint': fingerprint || '',
    },
  });

  return [response.status, await response.json()];
}

export async function createRun(
  id: string | undefined,
  modelProviderId: string,
  threadId: string | null
) {
  if (!id) {
    throw new Error('Assistant ID is required');
  }

  if (!threadId) {
    throw new Error('Thread ID is required');
  }

  let response = await fetch(
    '/api/' + modelProviderId + '/threads/' + threadId + '/runs',
    {
      method: 'POST',
      headers: {
        accept: 'application.json',
        'Content-Type': 'application/json',
        'X-Assistant-Id': id || '',
      },
    }
  );

  return response.body;
}

export async function createMessage(
  assistantId: string | undefined,
  modelProviderId: string,
  threadId: string | null,
  message: Message | undefined
) {
  if (!message) {
    return [400, { error: 'Message is required' }];
  }

  let response = await fetch(
    '/api/' + modelProviderId + '/threads/' + threadId + '/messages',
    {
      method: 'POST',
      headers: {
        accept: 'application.json',
        'Content-Type': 'application',
        'X-Assistant-Id': assistantId || '',
      },
      body: JSON.stringify({
        message: message,
      }),
    }
  );

  return [response.status, await response.json()];
}

export async function getMessages(
  assistantId: string | undefined,
  modelProviderId: string,
  threadId: string | undefined,
  after: string | undefined
) {
  if (!threadId) {
    return [400, { error: 'Thread ID is required' }];
  }

  let response = await fetch(
    '/api/' +
      modelProviderId +
      '/threads/' +
      threadId +
      '/messages?after=' +
      after,
    {
      method: 'GET',
      headers: {
        accept: 'application.json',
        'Content-Type': 'application/json',
        'X-Assistant-Id': assistantId || '',
      },
    }
  );

  return [response.status, await response.json()];
}

export function useGetThreads(assistantId: string | undefined) {
  let { data, isLoading, error, isValidating, mutate } = useSWR(
    '/api/assistants/' + assistantId + '/threads',
    (url: string) => fetch(url, {}).then((r) => r.json()),
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return useMemo(
    () => ({
      threads: data as Thread[],
      threadsLoading: isLoading,
      threadsError: error,
      threadsValidating: isValidating,
      threadsEmpty: !isLoading && !data?.length,
      reload: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

export async function getMessagesForThread(
  assistantId: string | null,
  modelProviderId: string,
  threadId: string | undefined
) {
  if (!threadId) {
    return [400, { error: 'Thread ID is required' }];
  }

  let response = await fetch(
    '/api/' + modelProviderId + '/threads/' + threadId + '/messages',
    {
      method: 'GET',
      headers: {
        accept: 'application.json',
        'Content-Type': 'application/json',
        'X-Assistant-Id': assistantId || '',
      },
    }
  );

  return [response.status, await response.json()];
}

export interface MetricsRequest {
  assistantId: string;
  timeBucket: string;
  startDateTime: string;
  endDateTime: string;
}

export async function getThreadMetrics(request: MetricsRequest) {
  let response = await fetch(
    '/api/metrics?metric=THREAD_CREATED&timeBucket=' +
      request.timeBucket +
      '&startDateTime=' +
      request.startDateTime +
      '&endDateTime=' +
      request.endDateTime,
    {
      method: 'GET',
      headers: {
        accept: 'application.json',
        'Content-Type': 'application/json',
        'X-Assistant-Id': request.assistantId || '',
      },
    }
  );

  return [response.status, await response.json()];
}

export async function getMessageMetrics(request: MetricsRequest) {
  let response = await fetch(
    '/api/metrics?metric=MESSAGE_CREATED&timeBucket=' +
      request.timeBucket +
      '&startDateTime=' +
      request.startDateTime +
      '&endDateTime=' +
      request.endDateTime,
    {
      method: 'GET',
      headers: {
        accept: 'application.json',
        'Content-Type': 'application/json',
        'X-Assistant-Id': request.assistantId || '',
      },
    }
  );

  return [response.status, await response.json()];
}

export async function updateVisibilityStatus(id: string | undefined) {
  if (!id) {
    return [400, { error: 'Assistant ID is required' }];
  }

  let response = await fetch('/api/assistants/' + id + '/visibility', {
    method: 'PUT',
    headers: {
      accept: 'application.json',
    },
  });

  return [response.status, await response.json()];
}

export async function updateAuthenticationRequirement(id: string | undefined) {
  if (!id) {
    return [400, { error: 'Assistant ID is required' }];
  }

  let response = await fetch('/api/assistants/' + id + '/authentication', {
    method: 'PUT',
    headers: {
      accept: 'application.json',
    },
  });

  return [response.status, await response.json()];
}

export async function uploadFile(assistantId: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return await fetch('/api/assistants/' + assistantId + '/files', {
    method: 'POST',
    body: formData,
  });
}

export async function getFiles(assistantId: string | undefined) {
  if (!assistantId) {
    return;
  }
  let response = await fetch('/api/assistants/' + assistantId + '/files');

  return await response.json();
}

export async function getFile(assistantId: string | undefined, fileId: string) {
  if (!assistantId) {
    return;
  }
  let response = await fetch(
    '/api/assistants/' + assistantId + '/files/' + fileId
  );

  return await response.json();
}

export async function deleteFile(assistantId: string, fileId: string) {
  return await fetch('/api/assistants/' + assistantId + '/files/' + fileId, {
    method: 'DELETE',
  });
}
