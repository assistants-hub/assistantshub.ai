import { Avatar, Dropdown, DropdownHeader, DropdownItem } from 'flowbite-react';
import { HiCog } from 'react-icons/hi';
import { SignOut } from '@/components/signout';

export interface UserDropdownProps {
  user?: any;
}

export default function UserDropdown(props: UserDropdownProps) {
  return (
    <div className='order-last flex pb-2 pl-2 pt-2 md:pl-10'>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt='User settings'
            img={props.user?.picture ? props.user?.picture : undefined}
            rounded
          />
        }
      >
        <DropdownHeader>
          <span className='block text-sm'>{props.user?.name}</span>
          <span className='block truncate text-sm font-medium'>
            {props.user?.email}
          </span>
        </DropdownHeader>
        <DropdownItem icon={HiCog} href={'/settings'}>
          Settings
        </DropdownItem>
        <SignOut />
      </Dropdown>
    </div>
  );
}
