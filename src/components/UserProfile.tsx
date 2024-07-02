import { SignInMenu } from '@/components/SignInMenu';
import { NavbarCollapse, NavbarToggle } from 'flowbite-react';
import UserDropdown from '@/components/UserDropdown';
import { getSession } from '@auth0/nextjs-auth0';
import { ResourcesMenu } from '@/components/ResourcesMenu';

export const UserProfile = async () => {
  const session = await getSession();

  return session && session.user ? (
    <>
      <NavbarToggle />
      <NavbarCollapse className='rtl:space-x-reverse'>
        <UserDropdown user={session.user} />
        <div className='m-auto text-lg font-semibold text-gray-500 antialiased'>
          <a href={'/assistants'}>Studio</a>
        </div>
        <ResourcesMenu />
      </NavbarCollapse>
    </>
  ) : (
    <>
      <NavbarToggle />
      <NavbarCollapse className='rtl:space-x-reverse'>
        <ResourcesMenu />
        <SignInMenu />
      </NavbarCollapse>
    </>
  );
};
