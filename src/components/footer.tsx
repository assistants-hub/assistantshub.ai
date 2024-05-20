import {
  Footer,
  FooterCopyright,
  FooterLinkGroup,
} from 'flowbite-react';
import { BsGithub, BsLinkedin, BsTwitterX } from 'react-icons/bs';

export function PageFooter() {
  return (
    <Footer container>
      <FooterCopyright
        href='#'
        by='Assistants Hub'
        year={new Date().getFullYear()}
      />
      <FooterLinkGroup className={"space-x-3"}>
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
        <Footer.Link
          href='/pages/terms.html'
        >Terms</Footer.Link>
        <Footer.Link
          href='/pages/privacy.html'
        >Privacy</Footer.Link>
        <Footer.Link
          href='/pages/cookies.html'
        >Cookie Policy</Footer.Link>
      </FooterLinkGroup>
    </Footer>
  );
}
