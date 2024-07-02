import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/utils/prisma';

export async function GET(req: NextRequest, res: NextResponse) {
  let assistants = await prisma.assistant.findMany({
    where: {
      published: true
    },
    select: {
      id: true,
      object: true,
      avatar: true,
      profile: true,
      modelId: true,
      published: true,
      authenticatedUsersOnly: true,
    },
  });
  let assistantsCollection = assistants.map((assistant) => {
    if (assistant.object) {
      // @ts-ignore
      assistant.object.profile = assistant.profile;
      // @ts-ignore
      assistant.object.modelId = assistant.modelId;
      // @ts-ignore
      assistant.object.published = assistant.published;
      // @ts-ignore
      assistant.object.avatar = assistant.avatar;
      // @ts-ignore
      assistant.object.authenticatedUsersOnly =
        assistant.authenticatedUsersOnly;
    }
    return assistant.object;
  });
  return Response.json(assistantsCollection, { status: 200 });
}