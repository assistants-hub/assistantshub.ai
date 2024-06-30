'use client';

import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const SignInMenu = function (
  props: React.ComponentPropsWithRef<typeof Button>
) {
  const router = useRouter();

  return (
    <Button
      gradientDuoTone='greenToBlue'
      size='sm'
      onClick={() => {
        router.push('/api/auth/login');
      }}
    >
      Sign In
    </Button>
  );
};
