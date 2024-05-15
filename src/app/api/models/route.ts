import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/utils/prisma';

// Note: We should not cache the models list as it may change frequently for different organizations
export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });
  if (token) {
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
