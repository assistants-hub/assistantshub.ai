import { Flowbite, ThemeModeScript } from 'flowbite-react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import './globals.css';
import { flowbiteTheme } from './theme';
import { Header } from '@/components/header'
import { PageFooter } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Assistants Hub',
  description:
    'Administration Portal for Deploying Assistants (Powered by OpenAI Assistants)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <title>Assistants Hub</title>
        <ThemeModeScript />
      </head>
      <body className={twMerge('bg-gray-50 dark:bg-gray-900', inter.className)}>
        <Flowbite theme={{ theme: flowbiteTheme }}>
          <div className="h-screen">
            <Header/>
            {children}
            <PageFooter/>
          </div>
        </Flowbite>
      </body>
    </html>
  );
}
