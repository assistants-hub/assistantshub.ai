import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/utils/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

// Note: We should not cache the models list as it may change frequently for different organizations
export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getSession();
  if (session?.user) {
    let providers = await prisma.modelProvider.findMany();

    let models = await prisma.model.findMany({
      include: {
        provider: true,
      },
    });
    return Response.json({ models: models, providers: providers });
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
