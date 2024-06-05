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
  DarkThemeToggle, Spinner,
} from 'flowbite-react';

export const UserProfile = () => {
  // @ts-ignore
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div className="text-right">
    <Spinner aria-label="Right-aligned spinner example" />
  </div>;

  return user ? (
    <>
      <NavbarToggle />
      <NavbarCollapse className="rtl:space-x-reverse">
      <div className='order-last flex pb-2 pl-2 pt-2 md:pl-10'>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='User settings'
                img={user?.picture ? user?.picture : undefined}
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className='block text-sm'>{user?.name}</span>
              <span className='block truncate text-sm font-medium'>
                {user?.email}
              </span>
            </DropdownHeader>
            <SignOut />
          </Dropdown>
        </div>
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
        <NavbarLink className='justify-end'>
          <DarkThemeToggle />
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
