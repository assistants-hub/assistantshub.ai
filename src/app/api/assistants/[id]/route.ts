import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-1, 1)[0];
};

// TODO: Limit these to same domain requests
export async function GET(req: NextRequest, res: NextResponse) {
  const id = getId(req);

  let assistant = await prisma.assistant.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      object: true,
      avatar: true,
      profile: true,
      theme: true,
    },
  });

  if (!assistant) {
    return Response.json(
      { message: 'Assistant does not exist' },
      { status: 404 }
    );
  }

  // Inject customization properties into the assistant object
  if (assistant.object) {
    // @ts-ignore
    assistant.object.avatar = assistant.avatar;
    // @ts-ignore
    assistant.object.profile = assistant.profile;
    // @ts-ignore
    assistant.object.theme = assistant.theme;
  }

  return Response.json(assistant.object, { status: 200 });
}