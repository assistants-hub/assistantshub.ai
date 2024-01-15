import { getServerSession } from 'next-auth/next';
import { SignOut } from '@/components/signout';
import { SignIn } from '@/components/signin';
import { Avatar, Dropdown, DropdownHeader, NavbarLink, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import { headers } from "next/headers";

export const UserProfile = async () => {
  const session = await getServerSession();
  // const pathname = headers().get('next-url'); - see https://github.com/vercel/next.js/issues/43704#issuecomment-1462971600

  return !session ? (
    <SignIn />
  ) : (
    <>
      <NavbarToggle />
      <div className='flex md:order-2'>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt='User settings'
              img={session?.user?.image ? session.user.image : undefined}
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className='block text-sm'>{session?.user?.name}</span>
            <span className='block truncate text-sm font-medium'>
            {session?.user?.email}
          </span>
          </DropdownHeader>
          <SignOut />
        </Dropdown>
      </div>
      <NavbarCollapse className="rtl:space-x-reverse">
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="/launchpad">Assistants</NavbarLink>
        <NavbarLink href="/docs">Documentation</NavbarLink>
        <NavbarLink href="mailto:santthosh@gmail.com">Help</NavbarLink>
      </NavbarCollapse>
    </>
  );
};
