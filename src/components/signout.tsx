'use client';

import { DropdownItem } from 'flowbite-react';

export const SignOut = function () {
  return <DropdownItem href={'/api/auth/logout'}>Sign Out</DropdownItem>;
};
