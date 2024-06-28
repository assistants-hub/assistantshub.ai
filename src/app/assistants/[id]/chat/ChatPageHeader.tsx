'use client';

import { Card, Dropdown, Navbar, NavbarBrand } from 'flowbite-react';
import Image from 'next/image';
import { useContext } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import { getImageHash } from '@/app/utils/hash';
import { UserProfile } from '@/components/user-profile';
import { useUser } from '@auth0/nextjs-auth0/client';
import UserDropdown from '@/components/user-dropdown';
import { getPrimaryBackgroundColor } from '@/app/utils/assistant';

export function ChatPageHeader() {
  const { assistant } = useContext(AssistantContext);

  const { user, error, isLoading } = useUser();

  return (
    <Navbar
      fluid
      rounded
      style={{
        backgroundColor: getPrimaryBackgroundColor(assistant),
      }}
    >
      <Navbar.Brand href='https://flowbite-react.com' className={'gap-2'}>
        <Image
          className='rounded-full'
          src={
            assistant.avatar
              ? assistant.avatar
              : '/images/people/avatar/' + getImageHash(assistant.id) + '.jpg'
          }
          width={40}
          height={40}
          alt='Assistant'
        />
        <span className='self-center whitespace-nowrap text-lg font-semibold dark:text-white'>
          {assistant.name}
        </span>
      </Navbar.Brand>
      {user ? <UserDropdown user={user} /> : <></>}
    </Navbar>
  );
}
