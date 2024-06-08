import { Flowbite, ThemeModeScript } from 'flowbite-react';
import { Inter } from 'next/font/google';
import './globals.css';
import { flowbiteTheme } from './theme';
import { Analytics } from '@vercel/analytics/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
    <head>
      <title>Assistants Hub</title>
      <meta name="title" content="Assistants Hub | Build, Integrate, and Deploy Personalized AI Assistants" />
      <meta name="description"
            content="Assistants Hub allows businesses and individuals to create, integrate, and deploy personalized AI assistants in minutes. Join us in building a robust ecosystem for AI collaboration." />
      <meta name="keywords"
            content="AI assistants, personalized assistants, AI integration, AI deployment, business automation, AI collaboration, Assistants Hub" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Assistants Hub" />
      <meta property="og:title" content="Assistants Hub | Build, Integrate, and Deploy Personalized AI Assistants" />
      <meta property="og:description"
            content="Assistants Hub enables businesses and individuals to create, integrate, and deploy personalized AI assistants quickly and efficiently. Discover how our platform fosters AI collaboration for achieving goals." />
      <meta property="og:url" content="https://assistantshub.ai" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://assistantshub.ai/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Assistants Hub | Build, Integrate, and Deploy Personalized AI Assistants" />
      <meta name="twitter:description"
            content="Assistants Hub helps businesses and individuals create, integrate, and deploy personalized AI assistants. Explore our platform for building a collaborative AI ecosystem." />
      <meta name="twitter:image" content="https://assistantshub.ai/twitter-image.png" />
      <ThemeModeScript />
    </head>
    <body
      className={inter.className}
      suppressHydrationWarning={process.env.NODE_ENV === 'development'}
    >
    <Flowbite theme={{ theme: flowbiteTheme }}>
      <UserProvider>
        {children}
      </UserProvider>
      <Analytics />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID ? process.env.GOOGLE_ANALYTICS_ID : ''} />
    </Flowbite>
    </body>
    </html>
  );
}
