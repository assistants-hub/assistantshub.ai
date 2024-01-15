'use client';

import { Button } from 'flowbite-react';
import { signIn } from 'next-auth/react';

export const SignIn = function (
  props: React.ComponentPropsWithRef<typeof Button>
) {
  return (
    <Button
      outline
      gradientDuoTone='purpleToBlue'
      size='sm'
      onClick={() => {
        signIn(undefined, { callbackUrl: '/launchpad' });
      }}
    >
      Sign In
    </Button>
  );
};
