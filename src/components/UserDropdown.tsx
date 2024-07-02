import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from 'flowbite-react';
import { SignOutMenu } from '@/components/SignOutMenu';
import { SettingsMenu } from '@/components/SettingsMenu';
import { AdministrationMenu } from '@/components/AdministrationMenu';
import { isAdminUser } from '@/utils/user';

export interface UserDropdownProps {
  user?: any;
}

export default function UserDropdown(props: UserDropdownProps) {
  return (
    <div className='order-last flex items-center justify-center pb-2 pl-2 pt-2 md:pl-10'>
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
        <DropdownItem className={'grid-col grid items-start justify-start'}>
          <span className='text-sm'>{props.user?.name}</span>
          <span className='truncate text-sm font-medium'>
            {props.user?.email}
          </span>
        </DropdownItem>
        <DropdownDivider />
        {isAdminUser(props.user) ? <AdministrationMenu /> : <></>}
        <SettingsMenu />
        <SignOutMenu />
      </Dropdown>
    </div>
  );
}
