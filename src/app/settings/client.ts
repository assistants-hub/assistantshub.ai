import useSWR from 'swr';
import { fetcher } from '@/app/utils/fetcher';
import { useMemo } from 'react';
import { ModelProviderKey } from '@/app/types/model';

export function useGetModelProviderKeys() {
  let { data, isLoading, error, isValidating, mutate } = useSWR(
    '/api/settings/keys',
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return useMemo(
    () => ({
      keys: data as ModelProviderKey[],
      keysLoading: isLoading,
      keysError: error,
      keysValidating: isValidating,
      keysEmpty: !isLoading && !data?.length,
      mutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

export async function createOrUpdateKey(key: ModelProviderKey) {
  let response = await fetch('/api/settings/keys', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: key.id,
      name: key.name,
      key: key.key,
      modelProviderId: key.modelProviderId,
    }),
  });

  return [response.status, await response.json()];
}
