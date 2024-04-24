import NextAuth from 'next-auth/next';
import GitHub from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import EmailProvider from 'next-auth/providers/email';
import { sendVerificationRequest } from '@/app/api/utils';

const prisma = new PrismaClient();

const emailProvider = EmailProvider({
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  },
  from: process.env.EMAIL_FROM,
  sendVerificationRequest: sendVerificationRequest,
});

const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
    ? process.env.GOOGLE_CLIENT_SECRET
    : '',
});

const githubProvider = GitHub({
  clientId: process.env.GITHUB_CLIENT_ID ? process.env.GITHUB_CLIENT_ID : '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET
    ? process.env.GITHUB_CLIENT_SECRET
    : '',
});

let providers = [];

if (process.env.ENABLE_EMAIL_PROVIDER === 'true') {
  providers.push(emailProvider);
}
if (process.env.ENABLE_GITHUB_PROVIDER === 'true') {
  providers.push(githubProvider);
}
if (process.env.ENABLE_GOOGLE_PROVIDER === 'true') {
  providers.push(googleProvider);
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: providers,
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    logo: '/logo.png', // Absolute URL to image
  },
  session: {
    strategy: 'jwt',
  },
};

// @ts-ignore
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
