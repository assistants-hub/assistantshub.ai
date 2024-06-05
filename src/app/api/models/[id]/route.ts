import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/utils/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-1, 1)[0];
};

// Note: We should not cache the models list as it may change frequently for different organizations
export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getSession();
  if (session?.user) {
    let id = getId(req);
    let model = await prisma.model.findFirst({
      where: {
        id: id,
      },
      include: {
        provider: true,
      },
    });
    return Response.json(model, { status: 200 });
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
