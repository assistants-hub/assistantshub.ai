import { getServerSession } from 'next-auth/next';
import { SignOut } from '@/components/signout';
import { SignIn } from '@/components/signin';

export const UserProfile = async () => {
  const session = await getServerSession();
  return session ? <SignOut /> : <SignIn />;
};
