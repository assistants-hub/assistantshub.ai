import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/utils/prisma';
import { getSession } from '@auth0/nextjs-auth0';

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

export async function PUT(req: NextRequest, res: NextResponse) {
  const session = await getSession();
  const id = getId(req);

  try {
    if (session?.user) {
      let organization = await prisma.organization.findFirst({
        where: {
          owner: session?.user.sub,
          ownerType: 'personal',
        },
      });

      if (organization) {
        let assistant = await prisma.assistant.findFirst({
          where: {
            id: id,
          },
          select: {
            id: true,
            organization: true,
            authenticatedUsersOnly: true,
          },
        });

        // @ts-ignore
        if (!assistant || assistant.organization.id !== organization.id) {
          return NextResponse.json({ message: 'Unauthorized' }, {
            status: 401,
          } as any);
        } else {
          await prisma.assistant.update({
            where: {
              id: assistant.id,
            },
            data: {
              // @ts-ignore
              authenticatedUsersOnly: !assistant.authenticatedUsersOnly,
            },
          });
          return NextResponse.json(
            { message: 'Update successful' },
            { status: 200 }
          );
        }
      }
    }
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, {
      status: 400,
    } as any);
  }
}
