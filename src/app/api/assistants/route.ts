import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });

  if (token) {
    let assistants = await prisma.assistant.findMany({
      where: {
        organizationOwner: token.sub,
        organizationOwnerType: 'personal',
      },
      select: {
        id: true,
        object: true,
        profile: true,
      },
    });
    let assistantsCollection = assistants.map((assistant) => {
      if (assistant.object) {
        // @ts-ignore
        assistant.object.profile = assistant.profile;
      }
      return assistant.object;
    });
    return Response.json(assistantsCollection, { status: 200 });
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}