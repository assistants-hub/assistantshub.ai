'use client'

import React, { useEffect } from 'react';
import { useGetListings } from '@/app/listings/client';
import { Button, Spinner } from 'flowbite-react';
import ListingCard from '@/app/listings/ListingCard';

export default function Listings() {
  let { listingsLoading, listings, listingsEmpty, mutate } = useGetListings();

  useEffect(() => {}, [listings]);

  if (listingsLoading) {
    return <div className='bg-grey flex h-[calc(100vh-100px)] items-center justify-center '>
      <Spinner />
    </div>
  }

  return <div className={'m-4 min-h-[calc(100vh-100px)] items-center justify-center'}>
    <div className={'flex flex-wrap items-center justify-center gap-4'}>
    {
      listings && listings.length > 0 ?
        listings.map((listing) => {
          return <div key={listing.id} className={'flex w-96 h-42 col-span-1 min-w-max'} onClick={() => {console.log(listing.id)}}>
              <ListingCard listing={listing}></ListingCard>
          </div>
    }) : <></>
    }
    </div>
  </div>;
}