import {
  getSession,
  handleAuth,
  handleLogin,
  handleProfile,
} from '@auth0/nextjs-auth0';
import prisma from '@/app/api/utils/prisma';

export const GET = handleAuth({
  login: handleLogin((req) => {
    let returnUrl = '/assistants';

    // @ts-ignore
    if (req.url && req.url.searchParams) {
      // @ts-ignore
      let redirectUrl = req.url.searchParams.get('returnTo');
      if (redirectUrl) {
        returnUrl = redirectUrl;
      }
    }

    return {
      returnTo: returnUrl,
    };
  }),
  // @ts-ignore
  profile: handleProfile(async (req) => {
    // @ts-ignore
    let session = await getSession(req);

    if (session?.user?.sub) {
      // Create organization if not yet created for this user
      const organization = await prisma.organization.upsert({
        where: {
          owner_ownerType: {
            owner: session?.user.sub,
            ownerType: 'personal',
          },
        },
        update: {},
        create: {
          owner: session?.user.sub,
          ownerType: 'personal',
        },
      });
    }
  }),
});
