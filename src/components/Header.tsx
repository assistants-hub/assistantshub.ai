import { Badge, Navbar, NavbarBrand, NavbarToggle } from 'flowbite-react';
import Image from 'next/image';
import { UserProfile } from '@/components/UserProfile';

export function Header() {
  return (
    <Navbar
      fluid
      rounded
      className={'fixed w-full border-b border-gray-200 tracking-tight'}
    >
      <NavbarBrand href='https://www.assistantshub.ai'>
        <Image
          src='/logo.png'
          alt='Assistants Hub Logo'
          width={0}
          height={0}
          sizes='5vw'
          style={{ width: '10%', height: 'auto' }} // optional
        />
        <span className='self-center whitespace-nowrap pl-2 pr-2 text-xl font-semibold tracking-tight dark:text-white'>
          Assistants Hub
        </span>
        <Badge color='pink'>BETA</Badge>
      </NavbarBrand>
      <UserProfile />
    </Navbar>
  );
}
