import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/utils/prisma';
import { getSession } from '@auth0/nextjs-auth0';

// Note: We should not cache the models list as it may change frequently for different organizations
export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getSession();
  if (session?.user) {
    let providers = await prisma.modelProvider.findMany();

    let models = await prisma.model.findMany({
      include: {
        provider: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    let keys = await prisma.modelProviderKey.findMany({
      where: {
        organizationOwner: session?.user.sub,
        organizationOwnerType: 'personal',
      },
      select: {
        id: true,
        name: true,
        modelProviderId: true,
      },
    });

    models.forEach((model) => {
      // @ts-ignore
      model.keys = keys.filter(
        (key) => model.provider.id === key.modelProviderId
      );
    });

    return Response.json({ models: models, providers: providers });
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
