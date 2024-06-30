import { SignInMenu } from '@/components/SignInMenu';
import { NavbarLink, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import UserDropdown from '@/components/UserDropdown';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export const UserProfile = async () => {
  const session = await getSession();

  return session && session.user ? (
    <>
      <NavbarToggle />
      <NavbarCollapse className='rtl:space-x-reverse'>
        <UserDropdown user={session.user} />
        <NavbarLink href='/'>
          <div className='pt-3 lg:text-lg'>Home</div>
        </NavbarLink>
        <NavbarLink href='/assistants' className='justify-end'>
          <div className='pt-3 lg:text-lg'>My Assistants</div>
        </NavbarLink>
        <NavbarLink
          href='https://docs.assistantshub.ai/'
          className='justify-end'
        >
          <div className='pt-3 lg:text-lg'>Docs</div>
        </NavbarLink>
        <NavbarLink
          href='mailto:support@assistantshub.ai'
          className='justify-end'
        >
          <div className='pt-3 lg:text-lg'>Help</div>
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
        <SignInMenu />
      </NavbarCollapse>
    </>
  );
};
