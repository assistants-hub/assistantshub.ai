"use client";

import {
  Footer,
  FooterCopyright,
} from 'flowbite-react';
import { BsGithub } from 'react-icons/bs';

export function PageFooter() {
  return (
    <Footer bgDark>
      <div className="w-full text-sm">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="Company" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">About Us</Footer.Link>
              <Footer.Link href="#">Careers</Footer.Link>
              <Footer.Link href="#">Brand Center</Footer.Link>
              <Footer.Link href="#">Blog</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Help center" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Contact Us</Footer.Link>
              <Footer.Link href="#">Contact Us</Footer.Link>
              <Footer.Link href="#">Contact Us</Footer.Link>
              <Footer.Link href="#">Contact Us</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
              <Footer.Link href="/terms">Terms &amp; Conditions</Footer.Link>
              <Footer.Link href="#">Contact Us</Footer.Link>
              <Footer.Link href="#">Contact Us</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
              <Footer.Link href="/terms">Terms &amp; Conditions</Footer.Link>
              <Footer.Link href="#">Contact Us</Footer.Link>
              <Footer.Link href="#">Contact Us</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            href="#"
            by="Assistants Hub LLC"
            year={new Date().getFullYear()}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
    );
}
