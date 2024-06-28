import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

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
});
