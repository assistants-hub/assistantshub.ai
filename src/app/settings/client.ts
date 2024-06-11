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
