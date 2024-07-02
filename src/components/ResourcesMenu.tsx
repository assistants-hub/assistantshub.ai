'use client';

import React from 'react';
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  NavbarLink,
} from 'flowbite-react';
import { HiBookmark, HiLibrary, HiMail } from 'react-icons/hi';

export const ResourcesMenu = function () {
  return (
    <div className='m-auto text-lg font-semibold text-gray-500 antialiased'>
      <Dropdown
        arrowIcon={false}
        inline
        label={'Resources'}
        className={'font-normal'}
      >
        <DropdownItem
          icon={HiLibrary}
          href={'https://docs.assistantshub.ai/docs/category/guides'}
        >
          Getting Started
        </DropdownItem>
        <DropdownItem
          icon={HiBookmark}
          href={'https://docs.assistantshub.ai/blog'}
        >
          Blog
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem icon={HiMail} href={'mailto:support@assistantshub.ai'}>
          Contact
        </DropdownItem>
      </Dropdown>
    </div>
  );
};
