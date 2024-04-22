import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import OpenAI from 'openai';
import { ulid } from 'ulidx';

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
      modelId: true,
      modelProviderId: true,
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
    // @ts-ignore
    assistant.object.modelId = assistant.modelId
      ? assistant.modelId
      : assistant.model;
    // @ts-ignore
    assistant.object.modelProviderId = assistant.modelProviderId;
  }

  return Response.json(assistant.object, { status: 200 });
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });

  const id = getId(req);

  if (token) {
    let organization = await prisma.organization.findFirst({
      where: {
        owner: token.sub,
        ownerType: 'personal',
      },
    });

    if (organization) {
      try {
        let assistant = await prisma.assistant.findFirst({
          where: {
            id: id,
          },
          select: {
            id: true,
            object: true,
            organizationOwner: true,
            organizationOwnerType: true,
            modelProviderId: true,
          },
        });

        if (
          !assistant ||
          assistant.organizationOwner !== token.sub ||
          assistant.organizationOwnerType !== 'personal'
        ) {
          return Response.json({ message: 'Unauthorized' }, { status: 401 });
        }

        let deleteResponse: any = { id: assistant.id };
        if (assistant.modelProviderId === 'openai') {
          const openai = new OpenAI({
            apiKey: organization.openAIApiKey,
          });

          deleteResponse = await openai.beta.assistants.del(id);
        }

        await prisma.assistant.delete({
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
        { message: 'OpenAI API Key does not exist' },
        { status: 400 }
      );
    }
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
