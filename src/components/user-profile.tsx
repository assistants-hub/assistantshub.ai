import { getServerSession } from 'next-auth/next';
import { SignOut } from '@/components/signout';
import { SignIn } from '@/components/signin';
import {
  Avatar,
  Dropdown,
  DropdownHeader,
  NavbarLink,
  NavbarCollapse,
  NavbarToggle, DarkThemeToggle, DropdownItem,
} from 'flowbite-react';
import { headers } from 'next/headers';

export const UserProfile = async () => {
  const session = await getServerSession();
  // const pathname = headers().get('next-url'); - see https://github.com/vercel/next.js/issues/43704#issuecomment-1462971600

  return !session ? (
    <>
      <NavbarToggle />
      <NavbarCollapse className='rtl:space-x-reverse'>
        <NavbarLink
          href='https://docs.assistantshub.ai/'
          className='justify-end'
        >
          <div className='pt-1 text-xl font-normal'>Docs</div>
        </NavbarLink>
        <SignIn />
      </NavbarCollapse>
    </>
  ) : (
    <>
      <NavbarToggle />
      <NavbarCollapse className='rtl:space-x-reverse'>
        <div className='order-last flex pb-2 pl-2 pt-2 md:pl-10'>
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
              <span className="block text-sm">{session?.user?.name}</span>
              <span className="block truncate text-sm font-medium">
                {session?.user?.email}
              </span>
            </DropdownHeader>
            <SignOut />
          </Dropdown>
        </div>
        <NavbarLink href='/'>
          <div className='pt-2 text-xl font-normal'>Home</div>
        </NavbarLink>
        <NavbarLink href='/assistants' className='justify-end'>
          <div className='pt-2 text-xl font-normal'>Assistants</div>
        </NavbarLink>
        <NavbarLink
          href='https://docs.assistantshub.ai/'
          className='justify-end'
        >
          <div className='pt-2 text-xl font-normal'>Docs</div>
        </NavbarLink>
        <NavbarLink href='mailto:santthosh@gmail.com' className='justify-end'>
          <div className='pt-2 text-xl font-normal'>Help</div>
        </NavbarLink>
        <NavbarLink className='justify-end'>
          <DarkThemeToggle />
        </NavbarLink>
      </NavbarCollapse>
    </>
  );
};
