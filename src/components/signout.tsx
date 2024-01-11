'use client';

import { DropdownItem } from 'flowbite-react';
import { signOut } from 'next-auth/react';

export const SignOut = function () {
  return (
    <DropdownItem onClick={() => {signOut()}}>Sign Out</DropdownItem>
  );
};
