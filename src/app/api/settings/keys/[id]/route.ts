import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/app/api/utils/prisma';

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-1, 1)[0];
};

export async function DELETE(req: NextRequest, res: NextResponse) {
  const session = await getSession();

  const id = getId(req);

  if (session?.user) {
    let organization = await prisma.organization.findFirst({
      where: {
        owner: session?.user.sub,
        ownerType: 'personal',
      },
    });

    if (organization) {
      try {
        let assistant = await prisma.modelProviderKey.findFirst({
          where: {
            id: id,
          },
          select: {
            id: true,
            name: true,
            organizationOwner: true,
            organizationOwnerType: true,
            modelProviderId: true,
          },
        });

        if (
          !assistant ||
          assistant.organizationOwner !== session?.user.sub ||
          assistant.organizationOwnerType !== 'personal'
        ) {
          return Response.json({ message: 'Unauthorized' }, { status: 401 });
        }

        let deleteResponse = await prisma.modelProviderKey.delete({
          where: {
            id: id,
          },
        });

        return Response.json(deleteResponse, { status: 200 });
      } catch (err: any) {
        return Response.json({ message: err.message }, { status: err.status });
      }
    } else {
      return Response.json(
        { message: 'Organization does not exist' },
        { status: 400 }
      );
    }
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
