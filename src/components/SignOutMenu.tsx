'use client';

import { DropdownItem } from 'flowbite-react';
import { HiLogout } from 'react-icons/hi';

export const SignOutMenu = function () {
  return (
    <DropdownItem icon={HiLogout} href={'/api/auth/logout'}>
      Sign Out
    </DropdownItem>
  );
};
