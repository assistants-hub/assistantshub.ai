import NextAuth from 'next-auth/next';
import GitHub from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sendVerificationRequest } from '@/app/api/utils/email';

const prisma = new PrismaClient();

let providers = [];

if (process.env.ENABLE_CREDENTIALS_PROVIDER === 'true') {
  // NOTE: This is intended for localhost testing or integrating with actual internal systems
  // NOTE: Documentation for this provider can be found here: https://next-auth.js.org/providers/credentials
  // WARNING: This is not recommended for production use, without proper modifications
  let credentialsProvider = {
    id: 'credentials',
    name: 'Credentials',
    credentials: {
      username: { label: 'Username', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials: any) {
      if (
        credentials.username === process.env.CREDENTIALS_APPROVED_USERNAME &&
        credentials.password === process.env.CREDENTIALS_APPROVED_PASSWORD
      ) {
        return {
          id: 1,
          name: 'J Smith',
          email:
            process.env.CREDENTIALS_APPROVED_USERNAME + '@assistantshub.ai',
        };
      }
      return null;
    },
  };

  providers.push(CredentialsProvider(credentialsProvider as any));
}

if (process.env.ENABLE_EMAIL_PROVIDER === 'true') {
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

  providers.push(emailProvider);
}
if (process.env.ENABLE_GITHUB_PROVIDER === 'true') {
  const githubProvider = GitHub({
    clientId: process.env.GITHUB_CLIENT_ID ? process.env.GITHUB_CLIENT_ID : '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET
      ? process.env.GITHUB_CLIENT_SECRET
      : '',
  });

  providers.push(githubProvider);
}
if (process.env.ENABLE_GOOGLE_PROVIDER === 'true') {
  const googleProvider = GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
      ? process.env.GOOGLE_CLIENT_SECRET
      : '',
  });

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
