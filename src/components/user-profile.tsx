'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { SignOut } from '@/components/signout';
import { SignIn } from '@/components/signin';
import {
  Avatar,
  Dropdown,
  DropdownHeader,
  NavbarLink,
  NavbarCollapse,
  NavbarToggle,
  DarkThemeToggle,
  Spinner,
  DropdownItem,
} from 'flowbite-react';
import { HiCog, HiLogout, HiUser } from 'react-icons/hi';
import UserDropdown from '@/components/user-dropdown';

export const UserProfile = () => {
  // @ts-ignore
  const { user, error, isLoading } = useUser();

  if (isLoading)
    return (
      <div className='text-right'>
        <Spinner aria-label='Right-aligned spinner example' />
      </div>
    );

  return user ? (
    <>
      <NavbarToggle />
      <NavbarCollapse className='rtl:space-x-reverse'>
        <UserDropdown user={user} />
        <NavbarLink href='/'>
          <div className='pt-2 lg:text-lg'>Home</div>
        </NavbarLink>
        <NavbarLink href='/assistants' className='justify-end'>
          <div className='pt-2 lg:text-lg'>Assistants</div>
        </NavbarLink>
        <NavbarLink
          href='https://docs.assistantshub.ai/'
          className='justify-end'
        >
          <div className='pt-2 lg:text-lg'>Docs</div>
        </NavbarLink>
        <NavbarLink
          href='mailto:support@assistantshub.ai'
          className='justify-end'
        >
          <div className='pt-2 lg:text-lg'>Help</div>
        </NavbarLink>
      </NavbarCollapse>
    </>
  ) : (
    <>
      <NavbarToggle />
      <NavbarCollapse className='rtl:space-x-reverse'>
        <NavbarLink
          href='https://docs.assistantshub.ai/'
          className='justify-end'
        >
          <div className='pt-1 lg:text-lg'>Docs</div>
        </NavbarLink>
        <SignIn />
      </NavbarCollapse>
    </>
  );
};
