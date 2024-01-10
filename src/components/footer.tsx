import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from 'flowbite-react';

export function PageFooter() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Assistants Hub" year={new Date().getFullYear()} />
          <FooterLinkGroup>
            <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Licensing</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </div>
          </FooterLinkGroup>
        </div>
      </div>
    </Footer>
);
}
