'use client';

import { Button } from 'flowbite-react';
import { signOut } from 'next-auth/react';

export const SignOut = function (
  props: React.ComponentPropsWithRef<typeof Button>
) {
  return (
    <Button
      outline
      gradientDuoTone='purpleToBlue'
      size='sm'
      onClick={() => {
        signOut();
      }}
    >
      Sign Out
    </Button>
  );
};
