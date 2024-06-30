'use client';

import { DropdownItem } from 'flowbite-react';
import { HiCog } from 'react-icons/hi';

export const SettingsMenu = function () {
  return (
    <DropdownItem icon={HiCog} href={'/settings'}>
      Settings
    </DropdownItem>
  );
};
