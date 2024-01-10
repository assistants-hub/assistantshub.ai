'use client';

import React from 'react';
import { Alert } from 'flowbite-react';

export default function Home() {
  return (
    <div>
      <Alert color='success'>
        <h3 className='text-lg font-medium text-green-700 dark:text-green-800'>
          Welcome to Assistants Hub!
        </h3>
      </Alert>
    </div>
  );
}
