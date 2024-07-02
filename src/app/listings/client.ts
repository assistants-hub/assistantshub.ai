import useSWR from 'swr';
import { fetcher } from '@/app/utils/fetcher';
import { useMemo } from 'react';
import { Assistant } from '@/app/types/assistant';

export function useGetListings() {
    let { data, isLoading, error, isValidating, mutate } = useSWR('/api/listings',
      fetcher,
      {
        revalidateIfStale: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );

    return useMemo(
      () => ({
        listings: data as Assistant[],
        listingsLoading: isLoading,
        listingsError: error,
        listingsValidating: isValidating,
        listingsEmpty: !isLoading && !data?.length,
        mutate: mutate,
      }),
      [data, error, isLoading, isValidating, mutate]
    );
  }
