import useSWR from 'swr';
import { useMemo } from 'react';
import { Model } from '@/app/types/model';

const fetcher = (url:string) => fetch(url).then((r) => r.json());

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

  console.log(data);

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
