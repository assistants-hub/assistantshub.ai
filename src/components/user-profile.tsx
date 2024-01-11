import { getServerSession } from 'next-auth/next';
import { SignOut } from '@/components/signout';
import { SignIn } from '@/components/signin';
import {
  Avatar,
  Dropdown,
  DropdownHeader,
  NavbarToggle,
} from 'flowbite-react';
export const UserProfile = async () => {
  const session = await getServerSession();
  return !session ? <SignIn /> :
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar alt="User settings" img={session.user.image} rounded />
        }
      >
        <DropdownHeader>
          <span className="block text-sm">{session.user.name}</span>
          <span className="block truncate text-sm font-medium">{session.user.email}</span>
        </DropdownHeader>
        <SignOut/>
      </Dropdown>
      <NavbarToggle />
    </div>
};
