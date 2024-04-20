import NextAuth from 'next-auth/next';
import GitHub from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : '',
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID ? process.env.GITHUB_CLIENT_ID : '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ? process.env.GITHUB_CLIENT_SECRET : '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    logo: '/logo.png', // Absolute URL to image
  },
  session: {
    strategy: "jwt"
  }
}

// @ts-ignore
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
