import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from 'flowbite-react';
import { BsGithub } from 'react-icons/bs';

export function PageFooter() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Assistants Hub" year={new Date().getFullYear()} />
          <FooterLinkGroup>
            <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
              <Footer.Icon href="https://github.com/santthosh/assistants-hub" icon={BsGithub} />
            </div>
          </FooterLinkGroup>
        </div>
      </div>
    </Footer>
);
}
