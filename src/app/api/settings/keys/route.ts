import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/app/api/utils/prisma';

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getSession();

  if (session?.user) {
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
    return Response.json(keys, { status: 200 });
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getSession();

  if (session?.user) {
    let organization = await prisma.organization.findFirst({
      where: {
        owner: session?.user.sub,
        ownerType: 'personal',
      },
    });

    if (organization) {
      const body = await req.json();

      let key = await prisma.modelProviderKey.upsert({
        where: {
          id: body.id,
        },
        update: {
          id: body.id,
          name: body.name,
          key: body.key,
          organizationOwner: session?.user.sub,
          organizationOwnerType: 'personal',
          modelProviderId: body.modelProviderId,
        },
        create: {
          id: body.id,
          name: body.name,
          key: body.key,
          organizationOwner: session?.user.sub,
          organizationOwnerType: 'personal',
          modelProviderId: body.modelProviderId,
        },
      });

      return Response.json(key, { status: 201 });
    } else {
      // Not Signed in
      return Response.json(
        { message: 'Invalid organization' },
        { status: 401 }
      );
    }
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
