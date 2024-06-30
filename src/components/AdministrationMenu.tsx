'use client';

import { DropdownDivider, DropdownItem } from 'flowbite-react';
import { HiFingerPrint } from 'react-icons/hi';

export const AdministrationMenu = function () {
  return (
    <>
      <DropdownDivider />
      <DropdownItem
        icon={HiFingerPrint}
        href={'/admin/dashboard'}
        className={'text-orange-800'}
      >
        Administration
      </DropdownItem>
      <DropdownDivider />
    </>
  );
};
