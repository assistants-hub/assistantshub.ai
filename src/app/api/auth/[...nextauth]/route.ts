import NextAuth from 'next-auth/next';
import GitHub from 'next-auth/providers/github';
export const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    logo: "/logo.png", // Absolute URL to image
  }
});

export { handler as GET, handler as POST };
