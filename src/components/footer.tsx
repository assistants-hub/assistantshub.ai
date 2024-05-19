import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from 'flowbite-react';
import { BsGithub } from 'react-icons/bs';

export function PageFooter() {
  return (
    <Footer container>
      <div className='flex items-end justify-start'>
        <div className='flex justify-end space-x-3 sm:flex sm:items-center sm:justify-between'>
          <FooterCopyright
            href='#'
            by='Assistants Hub'
            year={new Date().getFullYear()}
          />
          <FooterLinkGroup>
            <div className='w-full justify-between sm:flex sm:items-center sm:justify-between'>
              <Footer.Icon
                href='https://github.com/santthosh/assistants-hub'
                icon={BsGithub}
              />
            </div>
          </FooterLinkGroup>
        </div>
      </div>
      <div className='flex items-end justify-end'>
        <div className='flex justify-end space-x-3 sm:flex sm:items-center sm:justify-between'>
          <FooterLinkGroup>
            <div className='w-full justify-between sm:flex sm:items-center sm:justify-between'>
              <Footer.Link
                href='/pages/terms.html'
              >Terms</Footer.Link>
              <Footer.Link
                href='/pages/privacy.html'
              >Privacy</Footer.Link>
            </div>
          </FooterLinkGroup>
        </div>
      </div>
    </Footer>
  );
}
