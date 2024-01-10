import NextAuth from "next-auth/next"
export const handler = NextAuth({ providers: [] })

export { handler as GET, handler as POST }