import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLinkGroup,
} from 'flowbite-react';
import { BsGithub, BsLinkedin, BsTwitterX } from 'react-icons/bs';

export function PageFooter() {
  return (
    <Footer container>
      <div className='w-full text-center'>
        <div className='w-full justify-between sm:flex sm:items-center sm:justify-between'>
          <FooterBrand
            href='https://assistantshub.ai/'
            src='https://assistantshub.ai/logo.png'
            alt='Assistants Hub Logo'
          />
          <FooterLinkGroup>
            <Footer.Link href='/pages/terms.html'>Terms</Footer.Link>
            <Footer.Link href='/pages/privacy.html'>Privacy</Footer.Link>
            <Footer.Link href='/pages/cookies.html'>Cookie Policy</Footer.Link>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <FooterCopyright
            href='#'
            by='Assistants Hub'
            year={new Date().getFullYear()}
          />
          <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
            <Footer.Icon
              href='https://x.com/assistantshubai'
              icon={BsTwitterX}
            />
            <Footer.Icon
              href='https://www.linkedin.com/company/assistants-hub/'
              icon={BsLinkedin}
            />
            <Footer.Icon
              href='https://github.com/assistants-hub/assistantshub.ai'
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
