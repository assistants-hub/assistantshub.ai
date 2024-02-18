import { Badge, Navbar, NavbarBrand, NavbarToggle } from 'flowbite-react';
import Image from 'next/image';
import { UserProfile } from '@/components/user-profile';

export function Header() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href='https://assistants-hub.vercel.app'>
        <Image
          src='/logo.png'
          alt='Assistants Hub Logo'
          width={0}
          height={0}
          sizes='10vw'
          style={{ width: '10%', height: 'auto' }} // optional
        />
        <span className='self-center whitespace-nowrap pl-2 pr-2 text-2xl font-semibold dark:text-white'>
          Assistants Hub
        </span>
        <Badge color='pink'>BETA</Badge>
      </NavbarBrand>
      <UserProfile />
    </Navbar>
  );
}
