'use client'

import { Assistant } from '@/app/types/assistant';
import { Avatar, Button, Card } from 'flowbite-react';
import { getImageHash } from '@/app/utils/hash';
import React from 'react';

export interface ListingCardProps {
  listing: Assistant
}

export default function ListingCard(props:ListingCardProps) {
  return <Card className={ 'w-96 h-42 min-w-max min-h-max bg-gray-100' }
               horizontal>
    <div className="grid grid-flow-col gap-4">
      <Avatar
        img={
          props.listing.avatar
            ? props.listing.avatar
            : '/images/people/avatar/' +
            getImageHash(props.listing.id) +
            '.jpg'
        }
        alt='avatar'
        size='lg'
        rounded
        color='success'
      />
      <div className={'flex flex-col gap-1'}>
        <h6 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white max-h-8 overflow-auto">
          {props.listing.name}
        </h6>
        <p className="text-xs font-normal text-gray-700 dark:text-gray-400 max-w-60 max-h-8 overflow-auto">
          {props.listing.description}
        </p>
        <p className="text-xs font-semi-bold text-gray-400 dark:text-gray-400 max-w-60">
          By @santthosh
        </p>
      </div>
    </div>
  </Card>
}