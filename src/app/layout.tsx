import { Flowbite, ThemeModeScript } from 'flowbite-react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { flowbiteTheme } from './theme';
import { Analytics } from '@vercel/analytics/react';

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
      <body
        className={inter.className}
        suppressHydrationWarning={process.env.NODE_ENV === 'development'}
      >
        <Flowbite theme={{ theme: flowbiteTheme }}>
          {children}
          <Analytics />
        </Flowbite>
      </body>
    </html>
  );
}
